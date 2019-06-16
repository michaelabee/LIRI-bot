//calling necessary node packages and files
require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var songEntry = argv[2];
var spotifyThisSong = function() {
  spotify.search({ type: 'track', query: songEntry})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
};