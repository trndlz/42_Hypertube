const transporter = require("../config/nodemailer-setup").transporter;
const Model = require("../model/user");
const keys = require("../config/keys");

//https://topol.io/editor/5c3b98ba79c3f/edit

setNewPassword = async (req, res, next) => {
    try {
        const user = new User();
        let params = {
            email: req.body.email,
            password: req.body.password
        };
        let result = await user.getToken(params);
        if (result[0] && result[0].u_token === req.body.token) {
            user.setNewPassword(params);
            res.status(200).json({
                msg: "Password updated successfully"
            });
        } else {
            res.status(200).json({
                msg: "Token Invalid"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({
            msg: `Error while posting new Password: ${err}`
        });
    }
};

passwordForgotten = async (req, res, next) => {
    try {
        const user = new User();
        let params = {
            email: req.body.email
        };
        let result = await user.getToken(params);
        if (result[0]) {
            const output = `${result[0].u_token}`
            let mailOptions = {
                from: `"Matcha Contact" ${keys.mail.user}`,
                to: params.email,
                subject: "Password Forgotten",
                html: output
            };
            await transporter.sendMail(mailOptions);
        }
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(200).json({
            msg: `Error while posting forgottenEmail: ${err}`
        });
    }
};

emailCheckVerification = async (req, res, next) => {
    try {
        const user = await Model.User.findOne({email: req.body.email});
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
        const user = await Model.User.findOne({email: req.body.email});
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
        gewgiujhwiogjweoigjiwejgoijewgig
        <a href="http://localhost:3000/?action=verifyemail&email=${req.body.email}&token=${user.token}">Clic</a>
        </body>
        </html>
        `;
        let mailOptions = {
            from: `"Matcha Contact" ${keys.mail.user}`,
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
    emailCheckVerification: emailCheckVerification,
};