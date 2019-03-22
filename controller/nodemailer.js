const transporter = require("../config/nodemailer-setup").transporter;
const Model = require("../model/user");
const keys = require("../config/keys");

setNewPassword = async (req, res, next) => {
    try {
        const user = await Model.User.findOne({ email: req.body.email });
        if (user && user.token === req.body.token) {
            user.password = req.body.password;
            user.save();
            res.status(200).json({
                msg: "Password updated successfully",
                error: false
            });
        } else {
            res.status(200).json({
                msg: "Invalid Token",
                error: true
            });
        }
    } catch (err) {
        res.status(200).json({
            msg: `Error while posting new Password: ${err}`
        });
    }
};

passwordForgotten = async (req, res, next) => {
    try {
        const user = await Model.User.findOne({ email: req.body.email });
        if (user) {
            const output = user.token;
            let mailOptions = {
                from: `"HyperTube Contact" ${keys.mail.user}`,
                to: user.email,
                subject: "Password Forgotten",
                html: output
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({
                msg: "Email Password Forgotten Sent",
                error: false
            });
        } else {
            res.status(200).json({
                msg: "Email doesn't exist",
                error: true
            });
        }
        res.status(200).send();
    } catch (err) {
        res.status(200).json({
            msg: `Error while posting forgottenEmail: ${err}`
        });
    }
};

emailCheckVerification = async (req, res, next) => {
    try {
        const user = await Model.User.findOne({ email: req.body.email });
        if (user.token === req.body.token) {
            user.verified = true;
            user.save();
            res.status(200).json({
                msg: "Email Verification validated successfully",
                error: false
            });
        } else {
            res.status(200).json({
                msg: "Email Verification Unauthorized",
                error: true
            });
        }
    } catch (err) {
        res.status(200).json({
            msg: `Error while verifying email: ${err}`
        });
    }
};

emailSendVerification = async (req, res, next) => {
    try {
        const user = await Model.User.findOne({ email: req.body.email });
        const output = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title>Document</title>
        </head>
        <body>
        <h1>Welcome to Hypertube ${user.username}</h1>
        <a href="http://localhost:3000/?action=verifyemail&email=${
            req.body.email
        }&token=${
            user.token
        }">Please click on this link to verify your account.</a>
        </body>
        </html>
        `;
        let mailOptions = {
            from: `"Hypertube Contact" ${keys.mail.user}`,
            to: req.body.email,
            subject: "Email Verification",
            html: output
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            msg: "Email Verification sent successfully"
        });
    } catch (err) {
        res.status(200).json({
            msg: `Error while posting forgottenEmail: ${err}`
        });
    }
};

module.exports = exports = {
    passwordForgotten: passwordForgotten,
    setNewPassword: setNewPassword,
    emailSendVerification: emailSendVerification,
    emailCheckVerification: emailCheckVerification
};
