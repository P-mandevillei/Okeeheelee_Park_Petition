const admin = require('firebase-admin');
const SERVICE_ACCOUNT_CONFIG = JSON.parse(process.env.SERVICE_ACCOUNT_CONFIG);
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(SERVICE_ACCOUNT_CONFIG)
    });
}

const db = admin.firestore();

exports.handler = async(event, context) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({
                error: true,
                msg: "Method Not Allowed"
            })
        };
    }
    try {
        const snapshot = await db.collection('signatures').count().get();
        const count = snapshot.data().count;
        return {
            statusCode: 200,
            body: JSON.stringify({ 'error': false, 'count': count })
        }
    }
    catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: true, 
                msg: `Unable to connect to the database. Please try again later or contact our admins at ${process.env.EMAIL_USERNAME} with the following message: ${err.message}`
            })
        };
    }
}