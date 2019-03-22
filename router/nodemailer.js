const router = require("express").Router();
const {
    setNewPassword,
    passwordForgotten,
    emailCheckVerification,
    emailSendVerification
} = require("../controller/nodemailer");

router.post("/setnewpassword", setNewPassword);
router.post("/passwordforgotten", passwordForgotten);
router.post("/emailcheckverification", emailCheckVerification);

module.exports = router;
