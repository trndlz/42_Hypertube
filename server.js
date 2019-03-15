const express = require("express");
const app = express();
const port = 8145;
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
require('./config/passport-setup');

app.use(passport.initialize());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/hypertube', {useNewUrlParser: true});
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));

//========================================================
// ROUTES
//========================================================
const authRoute = require('./router/auth');
const torrentRoute = require('./router/torrent');
const secureRoute = require('./router/secure-route');
const testMongoose = require('./router/test-mongoose');
const email = require('./router/nodemailer');
app.use('/auth', authRoute);
app.use('/email', email);
app.use('/torrent', torrentRoute);
app.use('/testmongoose', testMongoose);
app.use('/secure', passport.authenticate('jwt', { session : false }), secureRoute );

//========================================================
// IMAGE TRANSFER
//========================================================
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));