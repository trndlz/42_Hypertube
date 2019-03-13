const router = require("express").Router();
const { setNewPassword, passwordForgotten, emailCheckVerification, emailSendVerification} = require('../controller/nodemailer');

//Password Change
router.post("/setnewpassword", setNewPassword);
router.post("/passwordforgotten", passwordForgotten);

//Verify Account
router.post("/emailcheckverification", emailCheckVerification);

module.exports = router;