from flask import Flask, jsonify, request, send_file, url_for, render_template
# from flask_cors import CORS
import paths
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import requests
import validations
from datetime import timedelta, datetime
from bson.objectid import ObjectId

app = Flask(__name__)

#cors = CORS(app, supports_credentials=True, origins=[paths.public_page_path])

# connect with mongodb
# https://cloud.mongodb.com
client = MongoClient(paths.mongodb_uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.cse330_m8
signatures = db.signatures

def recaptcha_validate(token):
    # reCAPTCHA: https://developers.google.com/recaptcha/docs/verify
    body = {
        'secret': paths.google_recaptcha_serverKey,
        'response': token
    }
    res = requests.post(paths.google_recaptcha_api, data=body)
    response = res.json()
    return response['success']

@app.route("/", methods=['GET'])
def main():
    return render_template(paths.public_page_path)

@app.route(paths.sign_path, methods=['POST'])
def sign():
    data = request.get_json()
    
    if not 'recaptchaToken' in data.keys() or not recaptcha_validate(data['recaptchaToken']):
        return {"error": True, "msg": "You smell like a robot! Please try again with reCAPTCHA."}, 401
    
    for field in ['firstName', 'lastName', 'email', 'zipCode', 'phone', 'address1', 'address2']:
        if field not in data.keys():
            return {"error": True, "msg": "Incomplete input fields!"}, 400 
    
    if len(data['firstName'])==0 or len(data['lastName'])==0 or not validations.is_valid_email(
        data['email']) or not validations.is_valid_zip_code(
        data['zipCode']) or (len(data['phone'])>0 and not validations.is_valid_US_phone(
        data['phone'])):
        return {'error': True, 'msg': 'Invalid inputs!'}, 400
    
    duplicate = signatures.count_documents({'firstName': data['firstName'], 'lastName': data['lastName'], 'email': data['email']})
    if duplicate != 0:
        return {'error': True, 'msg': "You have submitted a duplicate signature."}, 400

    signature = {
        "time": datetime.now().timestamp(),
        "firstName": data['firstName'],
        "lastName": data['lastName'],
        "email": data['email'],
        "zipCode": data['zipCode'],
        "phone": data['phone'],
        "address1": data['address1'],
        "address2": data['address2']
    }
    try:
        signatures.insert_one(signature)
        return {"error": False}
    except Exception as e:
        print(e)
        return {"error": True, "msg": "Sorry, your request cannot be processed by the database."}, 500

if __name__ == "__main__":
    app.run(
        # host='0.0.0.0', 
        port=5000, #3456, 
        debug=True
    )