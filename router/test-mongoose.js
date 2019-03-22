const router = require("express").Router();
const Model = require("../model/user");

router.post("/", async (req, res) => {
    const result = await Model.User.findOne({ email: req.body.email });
    console.log(result);
    res.json({
        msg: result
    });
});

module.exports = router;
