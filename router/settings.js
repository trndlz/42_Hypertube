const router = require("express").Router();
const checkAuth = require("./check-auth");
const { postSettings, getSettings } = require("../controller/settings");
const { upload } = require("../config/multer");

router.get("/", checkAuth, getSettings);
router.post("/", checkAuth, upload.single("userPicture"), postSettings);

module.exports = router;