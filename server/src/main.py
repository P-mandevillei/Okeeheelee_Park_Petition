from flask import Flask, send_from_directory, request, send_file, url_for, render_template
# from flask_cors import CORS
import paths
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import requests
import validations
from datetime import datetime
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="../../dist")

app.config['MAIL_MAX_EMAILS'] = 1000
app.config['MAIL_SERVER'] = 'smtp.gmail.com'   # Gmail SMTP server
app.config['MAIL_USERNAME'] = os.getenv('email_username')
app.config['MAIL_PASSWORD'] = os.getenv('email_password')
app.config['MAIL_DEFAULT_SENDER'] = ("Protect_Okeeheelee_Park", app.config['MAIL_USERNAME'])
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_PORT'] = 465 # use SSL

app.config['MONGODB_URI'] = os.getenv("mongodb_uri")
app.config['GOOGLE_RECAPTCHA_API'] = os.getenv("google_recaptcha_api")
app.config['GOOGLE_RECAPTCHA_SERVERKEY'] = os.getenv("google_recaptcha_serverKey")
app.config['EMAIL_RECIPIENT'] = os.getenv("email_recipient")

mail = Mail(app)

#cors = CORS(app, supports_credentials=True, origins=[paths.public_page_path])

# connect with mongodb
# https://cloud.mongodb.com
client = MongoClient(app.config['MONGODB_URI'])
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.protect_okeeheelee
signatures = db.signatures

def recaptcha_validate(token):
    # reCAPTCHA: https://developers.google.com/recaptcha/docs/verify
    body = {
        'secret': app.config['GOOGLE_RECAPTCHA_SERVERKEY'],
        'response': token
    }
    res = requests.post(app.config['GOOGLE_RECAPTCHA_API'], data=body)
    response = res.json()
    return response['success']

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
    
    try:
        duplicate = signatures.count_documents({'firstName': data['firstName'], 'lastName': data['lastName'], 'email': data['email']})
        if duplicate != 0:
            return {'error': True, 'msg': "You have submitted a duplicate signature."}, 400
    except Exception as e:
        return {'error': True, 'msg': f"Unable to connect to the database. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"}, 500

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
        return {'error': True, 'msg': f"Unable to connect to the database. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"}, 500

@app.route(paths.email_path, methods=['POST'])
def send_email():
    data = request.get_json()

    if not 'recaptchaToken' in data.keys() or not recaptcha_validate(data['recaptchaToken']):
        return {"error": True, "msg": "You smell like a robot! Please try again with reCAPTCHA."}, 401

    if ('subject' not in data.keys() or len(data['subject'])==0 or 'msg' not in data.keys() or len(data['msg'])==0):
        return {"error": True, "msg": "Missing Input Fields"}, 400
    
    msg = Message(
        subject=data['subject'],
        body=data['msg'],
        recipients=[app.config['EMAIL_RECIPIENT']]
    )
    try:
        mail.send(msg)
    except Exception as e:
        return {'error': True, 'msg': f"Unable to connect to the server. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"}, 500
    return {'error': False}, 200

@app.route(paths.proposal_path, methods=['GET'])
def send_proposal():
    return send_file(paths.proposal_doc_path)

@app.route(paths.all_facts_path, methods=['GET'])
def send_all_facts():
    return send_file(paths.all_facts_doc_path)

@app.route(paths.count_signs_path, methods=['GET'])
def count_signs():
    try:
        count = signatures.count_documents({})
        return {'error': False, 'count': count}
    except Exception as e:
        return {'error': True, 'msg': f"Your signature has been recorded, but we are unable to connect to the database at the moment. Please try again later or contact our admins at {app.config['MAIL_USERNAME']} with the following message: {str(e)}"}, 500

@app.route('/', defaults={'path': ''})
@app.route("/<path:path>")
def main(path):
    if path.startswith("api/"):
        return {"error": True, "msg": "API path not found"}, 404
    
    file_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, paths.public_page_path)

if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        #port=5000,
        debug=True
    )