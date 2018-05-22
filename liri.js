
//run liri.js
// take a command and returns a type of information
// the command dictates which function will be executed
// 



require('dotenv').config();

var keys = require("./keys.js");

main();

function main() {
	var command = process.argv[2];
	switch (command) {
		case 'my-tweets':
			getTweets();
			break;
		case 'spotify-this-song':
			callSpotify();
			break;
		case 'movie-this':
			getMovie();
			break;
		case 'do-what-it-says':
			readTxt();
			break;

		default:
			console.log("Invalid Command");

	}
}


function getTweets() {
	var Twitter = require('twitter');

	var client = new Twitter(keys.twitter);

	var params = { screen_name: 'QuigleyErmsmash' };
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			console.log(tweets[0].text);

			var tweetText = tweets.map(function (tweet) {
				return tweet.text;
			})
			console.log(tweetText);
		}
	});
};


function callSpotify() {
	var Spotify = require('node-spotify-api');

	var spotify = new Spotify(keys.spotify);

	var options = {};

	options.type = "track";
	options.query = process.argv[3] || "The Sign";

	function processSpotifyResults(error, data) {
		if (error) {
			return console.log("Error Occurred", error);
		}
		var songInfo = {};
		songInfo.albumName = data.tracks.items[0].album.name;
		songInfo.name = data.tracks.items[0].name;
		songInfo.preview_url = data.tracks.items[0].preview_url;
		songInfo.artists = data.tracks.items[0].artists.map(function (artist) {
			return artist.name;
		})
		console.log(songInfo);
	}

	spotify
		.search(options, processSpotifyResults);

}

function getMovie() {
	
	var request = require("request");

	var movieName = process.argv[3];

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	console.log(queryUrl);

	request(queryUrl, function (error, response, body) {

		
		if (!error && response.statusCode === 200) {

			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Production Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);

		}
	}
)}	

function readTxt() {
		// fs is a core Node package for reading and writing files
	var fs = require("fs");

	// This block of code will read from the "movies.txt" file.
	// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {

	// If the code experiences any errors it will log the error to the console.
	if (error) {
		return console.log(error);
	}

	// We will then print the contents of data
	console.log(data);

	// // Then split it by commas (to make it more readable)
	// var dataArr = data.split(",");

	// // We will then re-display the content as an array for later use.
	// console.log(dataArr);

});
}

