const admin = require('firebase-admin');
const { recaptcha_validate, is_valid_email, is_valid_US_phone, is_valid_zip_code } = require('./verifications');
const SERVICE_ACCOUNT_CONFIG = JSON.parse(process.env.SERVICE_ACCOUNT_CONFIG);
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(SERVICE_ACCOUNT_CONFIG)
    });
}

const db = admin.firestore();

exports.handler = async(event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({
                error: true,
                msg: "Method Not Allowed"
            })
        };
    }
    
    try {
        const data = JSON.parse(event.body);
        if (!data.recaptchaToken || !(await recaptcha_validate(data.recaptchaToken))) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: true, msg: "You smell like a robot! Please try again with reCAPTCHA." })
            };
        }

        for (let field of ['firstName', 'lastName', 'email', 'zipCode', 'phone', 'address1', 'address2']) {
            if (!(Object.keys(data).includes(field))) {
                
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: true, msg: "Incomplete input fields!" })
                };
            }
        }
        if (!data.firstName || !data.lastName || !is_valid_email(data.email) || !is_valid_zip_code(data.zipCode)
            || (data.phone && !is_valid_US_phone(data.phone)) 
        ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: true, msg: 'Invalid inputs!' })
            };
        }

        const duplicates = await db.collection('signatures')
            .where('first', '==', data.firstName)
            .where('last', '==', data.lastName)
            .where('email', '==', data.email)
            .get();
        if (!duplicates.empty) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: true, msg: "You have submitted a duplicate signature." })
            }
        }

        const signature = {
            time: admin.firestore.FieldValue.serverTimestamp(),
            first: data.firstName,
            last: data.lastName,
            email: data.email,
            zip: data.zipCode,
            phone: data.phone,
            address1: data.address1,
            address2: data.address2
        };
        await db.collection('signatures').add(signature);

        return {
            statusCode: 200,
            body: JSON.stringify({ error: false })
        };

    }
    catch(err) {
        //console.error('Error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: true, 
                msg: `Unable to connect to the database. Please try again later or contact our admins at ${process.env.EMAIL_USERNAME} with the following message: ${err.message}`
            })
        };
    }
}