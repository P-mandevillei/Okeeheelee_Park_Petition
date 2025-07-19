const functions = require('firebase-functions');
const {onCall} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions");
const { FieldValue } = require('firebase-admin/firestore'); 
const admin = require('firebase-admin');

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

const collectionName = 'signatures';

function is_valid_email(email){
    return /^[\w!#$%&'*+/=?^_`{}~\.-]+@[\w\-]+(\.[\w\-]+)+$/.test(email);
}

function is_valid_zip_code(zipCode) {
    return /^\d{5}$/.test(zipCode);
}

function is_valid_US_phone(phone) {
    return /^\d{10}$/.test(phone);
}

async function recaptcha_validate(token) {
    // reCAPTCHA: https://developers.google.com/recaptcha/docs/verify
    const body = {
        'secret': process.env.google_recaptcha_serverKey,
        'response': token
    }
    const res = await fetch(process.env.google_recaptcha_api, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: body
    });
    const result = await res.json();
    return result.success;
}

exports.addMessageCallable = onCall(async (request) => {
    const data = request.data;
    
    if (!'recaptchaToken' in Object.keys(data) || !recaptcha_validate(data['recaptchaToken'])) {
        return {"error": true, "msg": "You smell like a robot! Please try again with reCAPTCHA."};
    }
        
    for (let field of ['firstName', 'lastName', 'email', 'zipCode', 'phone', 'address1', 'address2']) {
        if (!(Object.keys(data).includes(field))) {
            return {"error": true, "msg": "Incomplete input fields!"}
        } 
    }
        
    if (!data.firstName || !data.lastName || !is_valid_email(data.email) || !is_valid_zip_code(data.zipCode) 
        || (data.phone && !is_valid_US_phone(data.phone))) {
            return {'error': true, 'msg': 'Invalid inputs!'}
        }
     
    try{
        const duplicates = await admin.firestore().collection(collectionName)
            .where('first', '==', data.firstName)
            .where('last', '==', data.lastName)
            .where('email', '==', data.email)
            .where('zip', '==', data.zipCode)
            .get();
        if (!duplicates.empty) {
            return {'error': true, 'msg': "You have submitted a duplicate signature."};
        }
    }
    catch(err) {
        return {'error': true, 'msg': "Unable to connect to the database. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"}
    }

    const signature = {
        time: FieldValue.serverTimestamp(),
        first: data.firstName,
        last: data.lastName,
        email: data.email,
        zip: data.zipCode,
        phone: data.phone,
        address1: data.address1,
        address2: data.address2
    }
    try{
        await admin.firestore().collection(collectionName).add(signature);
        return {error: false}
    }
    catch(err) {
        return {'error': true, 'msg': "Unable to connect to the database. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"};
    }
});


// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
