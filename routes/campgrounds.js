var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//INDEX - show all campgrounds
router.get("/", function(req, res){
	//get all campgrounds from DB
	Campground.find({}, function(err, AllCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: AllCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: desc, author: author};
	//create new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			req.flash("success", "Created new post!");
			res.redirect("/campgrounds");
		}
	});
	//redirect to /campgrounds page
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW - show individual info, should be after NEW
router.get("/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Post not found");
			res.redirect("back");
		} else {
			//render show template with campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect somewhere
			req.flash("success", "Post edited!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});

});


//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err, campgroundRemoved){
		if(err){
			res.redirect("/campgrounds");
		} Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
				req.flash("success", "Post Deleted!");
            	res.redirect("/campgrounds");
		});
	});
});



module.exports = router;