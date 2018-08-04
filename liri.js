require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
//add code required to import the keys.js file and stire it in a variable
var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(spotify, client);
function goLiri (action, item1) {
    switch (action) {
        case ("my-tweets"):
            myTweets();
            break;
        case ("spotify-this-song"):
            spotifyThisSong(item1);
            break;
        case ("movie-this"):
            movieThis(item1);
            break;
        case ("do-what-it-says"):
            doWhatItSays();
            break;
        default:
            break;
    }    
}
var action = process.argv[2];
var item1 = process.argv[3];
goLiri(action, item1);



function myTweets() {
    //This will show your last 20 tweets and when they were created at in your terminal/bash window.


}

function spotifyThisSong(song_title) {
    if(!song_title) {
        song_title = "The Sign";
    }
    console.log("Starting spotify function");
    console.log(song_title);
    console.log("Ending spotify function");
    //   This will show the following information about the song in your terminal/bash window

    //     * Artist(s)

    //     * The song's name

    //     * A preview link of the song from Spotify

    //     * The album that the song is from

    //   * If no song is provided then your program will default to "The Sign" by Ace of Base.

    //   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

    //   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

    //   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

    //   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

    //   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

    //   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


}


function movieThis(movie_name) {
    if (!movie_name) {
        movie_name = "Mr. Nobody";
    }
    var movieRequest = "http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy";
    request(movieRequest, function (error, response, body) {
        var movieInfo = JSON.parse(body);
        if (!error && response.statusCode === 200 && JSON.parse(body)["Response"] === "True") {
            console.log("Title: " + movieInfo["Title"]);
            console.log("Year: " + movieInfo["Year"]);
            console.log("IMDB Rating: " + movieInfo["imdbRating"]);
            console.log("Rotten Tomatoes Rating: " + movieInfo["Ratings"][1]["Value"]);
            console.log("Country: " + movieInfo["Country"]);
            console.log("Language: " + movieInfo["Language"]);
            console.log("Plot: " + movieInfo["Plot"]);
            console.log("Actors: " + movieInfo["Actors"]);
        }
    });




}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        //console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        //console.log(dataArr);
        var txtAction = dataArr[0];
        var txtSong = dataArr[1];
        goLiri(txtAction, txtSong);
      });
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    // * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

    // * Feel free to change the text in that document to test out the feature for other commands.


}