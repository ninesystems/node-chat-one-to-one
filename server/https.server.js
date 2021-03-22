let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session')
let ReactAppController = require('./routes/index');
let AuthController = require('./routes/auth');
// loading .env file to the process
require('dotenv').config()

let port = process.env.PORT || 4200;
let app = express();

// view engine setup, for secure login at server.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// highjack the above code & make it own.

// Enable json for communication
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.secret || 'sessi0nS3cr3t',
    saveUninitialized: true,
    resave: false
}))

// Mousing the index router, if you want to add more, you can mount here. but i feel single route is enough for now.
app.use('/auth', AuthController);
app.use('/', ReactAppController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.json({"message":"Page not found", "result":"error", "status":404});
});

// error handler
app.use(function(err, req, res, next) {
    res.status(200);
    res.json({"message":"Something went wrong", "result":"error", "status":500});
});

app.listen(port, function () {
    console.log('Example app listening on port ', port)
});