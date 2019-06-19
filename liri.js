//calling necessary node packages and files
require("dotenv").config('./*.env');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//------------------------------------------------------------------------------------

var movieThis = function(functionData) {
  
  var nodeArgs = process.argv;
  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];

    }
  }

  //sets a default search of "Mr. Nobody"
  if (typeof movieName === typeof undefined || movieName === "") {
    movieName = "Mr. Nobody";
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

var concertThis = function(functionData) {
  
 
    var nodeArgs = process.argv;
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
          
          console.log(error.request);
        } else {
          
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  
  };

//----------------------------------------------------------------------------------------------------------------------//

  var spotifyThisSong = function(songName) {
    var nodeArgs = process.argv;
    var songEntry = "";

    for (var i = 3; i < nodeArgs.length; i++) {
  
      if (i > 3 && i < nodeArgs.length) {
        songEntry = songEntry + " " + nodeArgs[i];
      } else {
        songEntry += nodeArgs[i];
        
      }
      
    };

  spotify
  .search({ type: 'track', query: songEntry })
  .then(function(response) {
    // console.log(response);
    try{
      var name = response.tracks.items[0].album.artists[0].name;
    var trackName = response.tracks.items[0].name;
    var album = response.tracks.items[0].album.name;
    var preview = response.tracks.items[0].external_urls.spotify;
    console.log('Artist: ' + name );
    console.log('Track Name: ' + trackName);
    console.log('Album: ' + album );
    console.log('Preview Link: ' + preview)
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

  readFile().then(function(data) {
    console.log(data);
    runThis(data[0], data[1]);
  });
  
}
function readFile () {
  return new Promise (function (resolve, reject){

    fs.readFile("random.txt", "utf8", function(error, data) {
      
      if (error) {
        return console.log(error);
      }
      
      dataArr = data.split(",");
      console.log(dataArr);
      resolve(dataArr);
      // processFile();
      
    });
  })
    
}

function processFile () {
  console.log('process file', dataArr);
//   if (dataArr.length === 2) {
//     pick(dataArr[0], dataArr[1]);
// console.log('dataArr[1]', dataArr);
  
//   } else if (dataArr.length === 1){
//     pick(dataArr[0]);
  // };
};

//------------------------------------------------------------------------------------------------//
//----------------------------------------RUN LIRI BELOW------------------------------------------//
  
  var pick = function (caseData, functionData) {
    console.log("do what it says", caseData, functionData);
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

