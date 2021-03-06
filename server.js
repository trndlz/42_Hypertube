//========================================================
// IMPORTS
//========================================================
const express = require("express");
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
// const morgan = require('morgan');
const CronJob = require('cron').CronJob;
const deleteUnusedFiles = require('./config/cronscript').deleteUnusedFiles;

require('./config/passport-setup');
require('pretty-error').start();

//========================================================
// MONGO
//========================================================
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

//========================================================
// MIDDLEWARES
//========================================================
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
// app.use(morgan('dev'));
app.use('/subtitles', express.static(__dirname + '/public/subtitles'));

//========================================================
// ROUTES
//========================================================
const authRoute = require('./router/auth');
const torrentRoute = require('./router/torrent');
const settingsRoute = require('./router/settings');
const profileRoute = require('./router/profile');
const emailRoute = require('./router/nodemailer');
const videoRoute = require('./router/video');
const commentsRoute = require('./router/comments');
app.use('/auth', authRoute);
app.use('/email', emailRoute);
app.use('/torrent', torrentRoute);
app.use('/settings', settingsRoute);
app.use('/profile', profileRoute);
app.use('/video', videoRoute);
app.use('/comments', commentsRoute);

//========================================================
// APP
//========================================================
const port = 8145;
app.listen(port, () => console.log(`Server is running on port ${port}`));

//========================================================
// CRON JOBS
//========================================================

// new CronJob('* * * * * *', function () { // For testing
new CronJob('0 0 1 * *', function () { // For production
	deleteUnusedFiles();
}, null, true);