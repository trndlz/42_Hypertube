const router = require("express").Router();
const checkAuth = require("./check-auth")

//API
router.get("/secure", checkAuth, (req, res, next) => {
  res.json({
        message: "You made it to the secure route",
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
    });
});

module.exports = router;