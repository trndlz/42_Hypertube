const nodemailer = require("nodemailer");
const keys = require("./keys");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: keys.mail.user,
        pass: keys.mail.pass
    }
});

module.exports = exports = {
    transporter: transporter
};