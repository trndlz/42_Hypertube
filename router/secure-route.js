const router = require("express").Router();

//API
router.get("/", (req, res, next) => {
  res.json({
        message: "You made it to the secure route",
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        // token: req.query.secret_token
    });
});

module.exports = router;