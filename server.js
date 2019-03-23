//========================================================
// IMPORTS
//========================================================
const express = require("express");
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys')
require('./config/passport-setup');

//========================================================
// MONGO
//========================================================
mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

//========================================================
// MIDDLEWARES
//========================================================
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

//========================================================
// ROUTES
//========================================================
const authRoute = require('./router/auth');
const torrentRoute = require('./router/torrent');
const settingsRoute = require('./router/settings');
const profileRoute = require('./router/profile');
const testMongoose = require('./router/test-mongoose');
const email = require('./router/nodemailer');
app.use('/auth', authRoute);
app.use('/email', email);
app.use('/torrent', torrentRoute);
app.use('/testmongoose', testMongoose);
app.use('/settings', settingsRoute );
app.use('/profile', profileRoute );

//========================================================
// APP
//========================================================
const port = 8145;
app.listen(port, () => console.log(`Server is running on port ${port}`));