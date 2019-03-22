const Model = require("../model/user");

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
};

const checkEmail = async email => {
    const user = await Model.User.findOne({ email });
    return user ? false : true;
};

const validateUsername = username => {
    const re = /^[0-9A-Za-z_\-.]{3,12}$/;
    return re.test(String(username));
};

const checkUsername = async username => {
    const user = await Model.User.findOne({ username });
    return user ? false : true;
};

const validateFirstName = name => {
    const re = /^[A-Za-z-]{3,20}$/;
    return re.test(String(name));
};

const validateLastName = name => {
    const re = /^[A-Za-z\- ]{3,20}$/;
    return re.test(String(name));
};

const validatePassword = password => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/;
    return re.test(String(password));
};

module.exports = exports = {
    validateUsername: validateUsername,
    checkUsername: checkUsername,
    validateFirstName: validateFirstName,
    validatePassword: validatePassword,
    validateLastName: validateLastName,
    validateEmail: validateEmail,
    checkEmail: checkEmail
};
