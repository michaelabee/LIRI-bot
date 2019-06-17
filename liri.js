//calling necessary node packages and files
require("dotenv").config('./*.env');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//------------------------------------------------------------------------------------

var movieThis = function() {
  
// Store all of the arguments in an array
  var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];

    }
  }

// Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      console.log("---------------------------------------");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("Cast: " + response.data.Actors);
      console.log("IMDB Rating: " + response.data.imdbRating);
      // console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0][1].value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("---------------------------------------");
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

};

//---------------------------------------------------------------------------------------------------------------------------------------------

var concertThis = function() {
  
  // Store all of the arguments in an array
    var nodeArgs = process.argv;
  
  // Create an empty variable for holding the movie name
    var artist = "";
  
    for (var i = 3; i < nodeArgs.length; i++) {
  
      if (i > 3 && i < nodeArgs.length) {
        artist = artist + "+" + nodeArgs[i];
      } else {
        artist += nodeArgs[i];
  
      }
    }
  
  // Then run a request with axios to the Bands in Town API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
    axios.get(queryUrl).then(
      function(response) {
        console.log("---------------------------------------");
        console.log(response.data[0].venue.city);
        console.log(response.data[0].venue.name);
        console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
        console.log("---------------------------------------");
      })
      .catch(function(error) {
        if (error.response) {
          
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  
  };

  var spotifyThisSong = function(songName) {
    var nodeArgs = process.argv;
    var songEntry = "imagine";

    // for (var i = 3; i < nodeArgs.length; i++) {
  
    //   if (i > 3 && i < nodeArgs.length) {
    //     songEntry = songEntry + "+" + nodeArgs[i];
    //   } else {
    //     songEntry += nodeArgs[i];
  
    //   }
    // }

    spotify
  .search({ type: 'track', query: songEntry })
  .then(function(response) {
    // console.log(response);
    // console.log(response.tracks.items[0])
    var name = response.tracks.items[0].album.artists[0].name;
    var trackName = response.tracks.items[0].name;
    var album = response.tracks.items[0].album.name;
    var preview = response.tracks.items[0].external_urls.spotify;
    console.log('Artist: ' + name );
    console.log('Track Name: ' + trackName);
    console.log('Album: ' + album );
    console.log('Preview Link: ' + preview)

  })
  .catch(function(err) {
    console.log(err);
  });
  
    };
  
  var pick = function (caseData, functionData) {
    switch(caseData) {
        case 'movie-this':
          movieThis();
          break;
      

        case 'concert-this':
          concertThis();
          break;

        case 'spotify-this-song':
          spotifyThisSong();
          break;

        default: 
        console.log("test test test");
    }
    
};

var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

