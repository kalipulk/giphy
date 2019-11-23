$(document).ready(function () {
    
    let gifButton = [""];

    function displayButton() {
        $("#gifs-options").empty();
        for (var i = 0; i < gifButton.length; i++) {
            var button = $("<button>");
            button.text(gifButton[i]);
            button.addClass("gif-button");
            button.attr("data-person", gifButton[i]);
            $("#gifs-options").append(button);
        }
    } displayButton();

    function searchGifs(searchTerm) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10rating=pg13";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let results = response.data;
            console.log("still url", results[0].images.original_still.url);
            $("#gifs-appear-here").empty();
            for (var i = 0; i < results.length; i++) {
                var personDiv = $("<div>");
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.attr("data-state", "animate");
                personImage.attr("data-still", results[i].images.original_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.addClass("gif");
                personDiv.append(personImage);
                $("#gifs-appear-here").prepend(personDiv);
            }
        });
    }

    $(".gif-button").on("click", function () {
        console.log(".gif-button")
        var person = $(this).attr("data-person");
        console.log("about to search", person);
        searchGifs(person);
    });

    $("#search-button").on("click", function () {
        console.log("#search-button", $("#site-search").val())
        $("#site-search").val();
        searchGifs($("#site-search").val());
        gifButton.push($("#site-search").val());
        displayButton();
    });

    // function for "animating" gifs
    $(document).on("click", ".gif", function () {
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

})