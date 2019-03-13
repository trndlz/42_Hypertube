const router = require("express").Router();
const Model = require("../model/user");

router.post("/", async (req, res) => {
    //const result = await Model.User.findById('5c877f1659e9a50277a4e54d')
    console.log(req.body)
    const result = await Model.User.findOne({email: req.body.email});
    console.log(result)
    res.json({
        msg: result
    });
});

module.exports = router;