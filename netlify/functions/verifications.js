const fetch = require('node-fetch');

const GOOGLE_RECAPTCHA_API = process.env.GOOGLE_RECAPTCHA_API;
const GOOGLE_RECAPTCHA_SERVER_KEY = process.env.GOOGLE_RECAPTCHA_SERVER_KEY;

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
        'secret': GOOGLE_RECAPTCHA_SERVER_KEY,
        'response': token
    }
    const res = await fetch(GOOGLE_RECAPTCHA_API, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    const result = await res.json();
    return result.success;
}

module.exports = {
    is_valid_email,
    is_valid_zip_code,
    is_valid_US_phone,
    recaptcha_validate
}