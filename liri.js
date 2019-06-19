//calling necessary node packages and files
require("dotenv").config('./*.env');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var nodeArgs = process.argv;
var searchTerm = "";

    for (var i = 3; i < nodeArgs.length; i++) {
  
      if (i > 3 && i < nodeArgs.length) {
        searchTerm = searchTerm + " " + nodeArgs[i];
      } else {
        searchTerm += nodeArgs[i];
        
      }
      
    };

//------------------------------------------------------------------------------------//

var movieThis = function(functionData) {
  //sets a default search of "Mr. Nobody"
  searchTerm = functionData;
  if (typeof searchTerm === typeof undefined || searchTerm === "") {
    searchTerm = "Mr. Nobody";
  }


//run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      console.log("---------------------------------------");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("Cast: " + response.data.Actors);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
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
  
        console.log(error.request);
      } else {
       
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

};

//---------------------------------------------------------------------------------------------------------------------------------------------

var concertThis = function(functionData) {
  searchTerm = functionData;
  
  // run a request with axios to the Bands in Town API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
  
    axios.get(queryUrl).then(
      function(response) {
        console.log("---------------------------------------");
        console.log("City: " + response.data[0].venue.city);
        console.log("Venue: " + response.data[0].venue.name);
        console.log("When: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
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
          
          console.log(error.request);
        } else {
          
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  
  };

//----------------------------------------------------------------------------------------------------------------------//

  var spotifyThisSong = function(functionData) {
  searchTerm = functionData;

  spotify
  .search({ type: 'track', query: searchTerm })
  .then(function(response) {

    try{
    console.log('Artist: ' + response.tracks.items[0].album.artists[0].name );
    console.log('Track Name: ' + response.tracks.items[0].name);
    console.log('Album: ' + response.tracks.items[0].album.name);
    console.log('Preview Link: ' + response.tracks.items[0].external_urls.spotify)
    } catch (error) {
      console.log('error getting track information', error);
    }

  })
  .catch(function(err) {
    console.log(err);
  });
  
    };
  
//--------------------------------------------------------------------------------------------------------------//
var dataArr;

var doWhatItSays = function() {
//Grabs information from random.txt
    fs.readFile("random.txt", "utf8", function(error, data) {
      
      if (error) {
        return console.log(error);
      }
      //puts that information into an array
      dataArr = data.split(",");
      //feeds the information to the pick function
      pick(dataArr[0],dataArr[1]);

    });
  };

//------------------------------------------------------------------------------------------------//
//----------------------------------------RUN LIRI BELOW------------------------------------------//
  
  var pick = function (caseData, functionData) {
    //decides what function to run based on what the user enters 
    switch(caseData) {
        case 'movie-this':
          movieThis(functionData);
          break;
      
        case 'concert-this':
          concertThis(functionData);
          break;

        case 'spotify-this-song':
          spotifyThisSong(functionData);
          break;

        case 'do-what-it-says':
          doWhatItSays();
          break;

        default: 
        console.log("LIRI doesn't know that!");
    }
    
};

var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

