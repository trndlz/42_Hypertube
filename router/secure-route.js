const router = require("express").Router();

//API
router.get("/gallery", (req, res, next) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token
    });
});

module.exports = router;