var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
	{name: "RC and Me", 
	 image: "https://scontent.fcbr2-1.fna.fbcdn.net/v/t1.0-9/36502362_2091674794200226_8929107978976493568_n.jpg?_nc_cat=110&_nc_sid=13bebb&_nc_eui2=AeHZUzTGnj2kt1lTIA-dIrvA8zqfvNVJFQDzOp-81UkVAEhyEYesbda5ZHrOxLXtGY-9FhUEGN9lZOp9RMlrIg0W&_nc_ohc=zK2f5vie2dkAX-TSl98&_nc_ht=scontent.fcbr2-1.fna&oh=31e993eec062e377c35fcf29c069aedb&oe=5EF0AD08", 
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	{name: "RC", 
	 image: "https://scontent.fcbr2-1.fna.fbcdn.net/v/t1.0-9/s960x960/36472532_2091675664200139_2443204056273911808_o.jpg?_nc_cat=100&_nc_sid=13bebb&_nc_eui2=AeFq9nF9DG9jMn91kztj9HbFQhK1j0dDVD5CErWPR0NUPtSjevbG5PhL28d7FBncs4L8MA_gLvwCoFfT14fMZyJz&_nc_ohc=BOOrRYqOO3QAX_czJC-&_nc_ht=scontent.fcbr2-1.fna&_nc_tp=7&oh=9d221f884de59807f32a770f7dbf9d85&oe=5EF26927", 
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	{name: "RC and Me", 
	 image: "https://scontent.fcbr2-1.fna.fbcdn.net/v/t1.0-9/s960x960/93064200_3289482527752774_1511571546068484096_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_eui2=AeFdob1tfxQYFX4JoQxUy08DFbskLkpu-c4VuyQuSm75ztsVZ6rgIfuCpTpk_cp2kmwm5F1VtLfWpBvADH6nDhUW&_nc_ohc=GraGTqlhifMAX8z1XT1&_nc_ht=scontent.fcbr2-1.fna&_nc_tp=7&oh=8e2f22b45ad1304379afaa6556eb0382&oe=5EF1FC73", 
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
];

function seedDB(){
	//remove all campgrounds
		Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
			console.log("removed campgrounds!");
			//add a few campgrounds
			data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("Added a Campground");
					//create a comment
					Comment.create(
						{
							text: "No wifi here",
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
						});
				}
			});
		});
	});
}

module.exports = seedDB;
