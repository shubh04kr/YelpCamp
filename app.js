const express = require("express")
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
// const catchAsync = require('./utils/catchAsync')
const session = require('express-sessions')
const flash = require('connect-flash');
// const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');
// const { resolveAny } = require("dns");
// const { campgroundSchema } = require('./schemas.js')


const campgrounds = require('./routes/campgrounds')



mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log(" Database Connected!!!");
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.engine('ejs', ejsMate)
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

var sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        HttpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/campgrounds', campgrounds)
// app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home')
})




app.all('*', (req, res, next) => {
    next(new ExpressError('Page mmmmmmm Not Found', 404))
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh NO Something went wrong!"
    res.status(statusCode).render('error', { err })
    // res.send("Oh Boy!! Something went wrong")
})

app.listen(3000, () => console.log("listening at 3000"))
