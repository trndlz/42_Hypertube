const router = require("express").Router();
const checkAuth = require("./check-auth");
const { getProfile, setVideoSeen } = require("../controller/profile")

router.get("/:id", checkAuth, getProfile);
router.post("/videoSeen", checkAuth, setVideoSeen);

module.exports = router;