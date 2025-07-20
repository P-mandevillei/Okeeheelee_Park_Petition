const nodemailer = require('nodemailer');
const { recaptcha_validate } = require('./verifications');
const emailConfig = {
    MAIL_SERVER: 'smtp.gmail.com',
    MAIL_USERNAME: process.env.EMAIL_USERNAME, // From environment variables
    MAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    MAIL_DEFAULT_SENDER: `"Protect_Okeeheelee_Park" <${process.env.EMAIL_USERNAME}>`,
    MAIL_PORT: 465,
    MAIL_USE_SSL: true,
    MAIL_USE_TLS: false,
    EMAIL_RECIPIENT: 'chenglin.l@wustl.edu', //process.env.EMAIL_RECIPIENT,
    MAIL_MAX_EMAILS: 1000
};
const transporter = nodemailer.createTransport({
    host: emailConfig.MAIL_SERVER,
    port: emailConfig.MAIL_PORT,
    secure: emailConfig.MAIL_USE_SSL, // true for 465, false for other ports
    auth: {
        user: emailConfig.MAIL_USERNAME,
        pass: emailConfig.MAIL_PASSWORD
    }
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {statusCode: 405, body: "Method Not Allowed"};
    }

    const data = JSON.parse(event.body);
    if (!data.recaptchaToken || !(await recaptcha_validate(data.recaptchaToken))) {
        return {
            statusCode: 401,
            body: JSON.stringify({"error": true, "msg": "You smell like a robot! Please try again with reCAPTCHA."})
        }
    }
    if (!data.subject || !data.msg) {
        return {
            statusCode: 400,
            body: JSON.stringify({"error": true, "msg": "Missing Input Fields"})
        }
    }
    try {
        const info = await transporter.sendMail({
            from: emailConfig.MAIL_DEFAULT_SENDER,
            to: emailConfig.EMAIL_RECIPIENT,
            subject: data.subject,
            text: data.msg
        })
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                error: false
            })
        };
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: true, 
                msg: `Unable to connect to the server. Please try again later or contact our admins at ${process.env.EMAIL_USERNAME} with the following message: ${err.message}`
            })
        };
    }
}