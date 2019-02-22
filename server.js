const express = require("express");
const app = express();
const port = 8145;
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
require('./config/passport-setup');
require("./model/dbconnect");

app.use(passport.initialize());
app.use(cors());


// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));

const route = require('./router/auth');
const secureRoute = require('./router/secure-route');
app.use('/auth', route);
app.use('/mainpage', passport.authenticate('jwt', { session : false }), secureRoute );