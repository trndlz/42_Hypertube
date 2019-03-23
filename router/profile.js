const router = require("express").Router();
const checkAuth = require("./check-auth");
const { getProfile } = require("../controller/profile")

router.get("/:id", checkAuth, getProfile);

module.exports = router;