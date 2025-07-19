/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
const admin = require('firebase-admin');
admin.initializeApp();

function is_valid_email(email){
    return /^[\w!#$%&'*+/=?^_`{}~\.-]+@[\w\-]+(\.[\w\-]+)+$/.test(email);
}

function is_valid_zip_code(zipCode) {
    return /^\w{5}$/.test(zipCode);
}

function is_valid_US_phone(phone){
    return /^\w{10}$/.test(phone);
}

exports.addMessageCallable = functions.https.onCall(async (request, response) => {
  // Data passed from the client is in request.data
  const data = request.data;
    
    if (!'recaptchaToken' in data.keys()) { // || !recaptcha_validate(data['recaptchaToken'])) {
        return response.status(401).send({"error": True, "msg": "You smell like a robot! Please try again with reCAPTCHA."})
    }
        
    for (let field of ['firstName', 'lastName', 'email', 'zipCode', 'phone', 'address1', 'address2']) {
        if (!Object.keys(data).includes(field)) {
            return response.status(400).send({"error": True, "msg": "Incomplete input fields!"}); 
        } 
    }
        
    if (!data['firstName'] || !data['lastName'] 
        || !is_valid_email(data['email']) || !is_valid_zip_code(data['zipCode']) 
        || (data['phone'] && !is_valid_US_phone(data['phone']))) {
            return response.status(400).send({'error': True, 'msg': 'Invalid inputs!'})
        }
    /*    
    try{
        duplicate = signatures.count_documents({'firstName': data['firstName'], 'lastName': data['lastName'], 'email': data['email']})
        if duplicate != 0:
            return {'error': True, 'msg': "You have submitted a duplicate signature."}, 400
    }
    except Exception as e:
        return {'error': True, 'msg': f"Unable to connect to the database. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"}, 500
    */
    signature = {
        "time": admin.firestore.FieldValue.serverTimestamp(),
        "first": data['firstName'],
        "last": data['lastName'],
        "email": data['email'],
        "zip": data['zipCode'],
        "phone": data['phone'],
        "address1": data['address1'],
        "address2": data['address2']
    }
    try{
        await admin.firestore().collection('signatures').add(signature);
        return {"error": False}
    }
    catch(err) {
        return response.status(500).send({'error': True, 'msg': "Unable to connect to the database. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"})
    }
});


// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
