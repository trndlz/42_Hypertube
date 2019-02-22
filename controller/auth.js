const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

signToken = (user) => {
    return jwt.sign({
        iss: 'hypertube',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
    }, keys.jwt)
}

const googleAuth = (req, res) => {
    res.redirect("http://localhost:3000/mainpage/gallery");    
}

const facebookAuth = (req, res) => {
    res.redirect("http://localhost:3000/mainpage/gallery");    
}

const localSignUpAuth = (req, res) => {
    res.status(200).json({ 
        message : 'Signup successful',
        user : req.user
    });
}

const localSignInAuth = (req, res) => {
    console.log(req);
        const body = { _id: req.user._id, email: req.user.email };
        const token = jwt.sign({ user: body }, "top_secret");
        return res.status(200).json({ token });
}

// const localSignInAuth = (req, res) => {
//     // req.login(user, { session: false }, async error => {
//         const body = { _id: user._id, email: user.email };
//         const token = jwt.sign({ user: body }, "top_secret");
//         return res.status(200).json({ token });
//     // });
// }


module.exports = exports = {
    googleAuth,
    facebookAuth,
    signToken,
    localSignUpAuth,
    localSignInAuth
}


//const token = signToken(newUser);
//res.status(200).json({token});