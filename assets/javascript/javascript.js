//Array of movie stars to start off

var moviestars = ["Bette Davis", "Marlon Brando", "Judy Garland", "Bruce Lee", "Shahrukh Khan"]

// Function to empty out the div before adding new gifs to the page  
function displayMovieStarGifs() {
  $("#gifs").empty();  
  var moviestar = $(this).attr("data-star");
  var queryURL = queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  moviestar + "&api_key=GKzi00jNxaVkixZpKpqu1p0OoIESDkPH&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // $("#moviestars-view").text(JSON.stringify(response));
    // renderButtons();
    var results = response.data
    console.log(results);
    // Create loop to apply to all of the gifs
    for(var i =0; i <results.length; i++){
        //Create a div for each of the gifs
        var gifDiv = $("<div>");
        console.log(moviestars);

        gifDiv.addClass("gifClass");

        var rating = results[i].rating;
        var ratingShow = $("<p>").text("Rating:" + rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
       
        //Data-still attribute
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gifImage");

        //Appending to show rating in the same div
        gifDiv.append(gifImage);
        gifDiv.append(ratingShow);

        //Append to gifDiv to show in HTML
        $("#gifs").prepend(gifDiv);

    }

    //Div to hold all the necessary information
    var gifDiv = $("<div>");

    gifDiv.addClass("gifs");


  });
  console.log(queryURL);
}

// Create a loop for the array of movie star to make them into buttons
function renderButtons() {
  
$("#buttons-view").empty();
    
    for (var i = 0; i < moviestars.length; i++) {
      
    var a = $("<button>");
    a.addClass("moviestar");
    a.attr("data-star", moviestars[i]);
    a.text(moviestars[i]);
      
    
    $("#buttons-view").append(a);
  }
}
renderButtons();

// Apending buttons with names added by user
$("#add-moviestar").on("click", function(event) {
  event.preventDefault();
  
  var moviestar = $("#moviestars-input").val().trim();
  
  moviestars.push(moviestar);
  console.log(moviestar);
  
  renderButtons();
});

    $(document).on("click", ".moviestar", displayMovieStarGifs);

    renderButtons();

    //If/else statements for .on.click still and animate state for gifs

    $("body").on("click", ".gifImage", function(){
        
        var state = $(this).attr("data-state");
        //Check the "state" of the gif
        if(state === "still")
        {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    
    });

