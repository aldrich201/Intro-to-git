var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds");

//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");


//seedDB(); //seed database
//app config
mongoose.connect("mongodb+srv://aldrich201:Hongtienchai12@cluster0-mk411.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false
}).then(() => {
	console.log("Connected to Database");
}).catch(err => {
	console.log("ERROR:", err.message);
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());

//Passport Config
app.use(require("express-session")({
	secret: "A secret is a secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("CONNECTED");
});

//<%- include("partials/header") %>
//<%- include("partials/footer") %>

//RESTFUL ROUTES
//INDEX   (SHOW ALL POSTS OR INFO)        GET
//CREATE  (ADD TO DATABASE)               POST 
//NEW     (SHOW FORM TO CREATE)           GET
//SHOW    (SHOWS INFO ABT 1 POST OR INFO) GET