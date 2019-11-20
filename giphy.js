//let gifButton = ["Steve Carrell"];

$("button").on("click", function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      let results = response.data;
      for (var i = 0; i < results.length; i++) {
      var personDiv = $("<div>");
      var personImage =$("<img>");
      personImage.attr("src", results[i].images.fixed_height.url)
      personDiv.append(personImage);
      $("#gifs-appear-here").prepend(personDiv);
      }

    }); 
  });

$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    let state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });