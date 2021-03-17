let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session')
let indexRouter = require('./routes/index');
let port = process.env.PORT || 4200;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.secret || 'sessi0nS3cr3t',
    saveUninitialized: true,
    resave: false
}))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('error');
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, function () {
    console.log('Example app listening on port ', port)
});