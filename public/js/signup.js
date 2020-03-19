$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

function grab_data()
{
    // set the apikey and limit
    var apikey = "G3VF5QZIAX0Z";
    var lmt = 8;

    // test search term
    var search_term_first = "khloe"
    //var search_term_first = "kim"
    //var search_term_first = "kourtney"
    var search_term_last = "kardashian";
    var search_term = search_term_first + search_term_last

    // using default locale of en_US
    var search_url = "https://api.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}

// url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];
    console.log(top_10_gifs);

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

    document.getElementById("preview_gif").src = top_10_gifs[0]["media"][0]["nanogif"]["url"];
    //document.getElementById("preview_gif2").src = top_10_gifs[1]["media"][0]["nanogif"]["url"];

    //document.getElementById("share_gif").src = top_10_gifs[0]["media"][0]["tinygif"]["url"];

    return;

}

function getQuote() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
     // Access the result here
     //alert(this.responseText);
     var back = JSON.parse(this.response);
     console.log(back)
     console.log(back.contents.quotes[0].quote)
     console.log(back.contents.requested_author)
     outQuote = back.contents.quotes[0].quote
     outAuthor = back.contents.requested_author
     document.getElementById("QOD").innerHTML = outQuote;
     document.getElementById("QODSource").innerHTML = outAuthor;
     return outTo;
 }
  };
  xhttp.open("GET", "https://quotes.rest/quote/search?author=kim%20kardashian%20&minlength=100&maxlength=300&private=false&language=en&limit=5&sfw=false", true);
  //xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("X-Theysaidso-Api-Secret", "Svix6Lv46rgyPi54Z6Oy_weF");
  xhttp.send();
}

getQuote();
//document.getElementById("QOD").innerHTML = outTo;
grab_data()

//$(".jumbotron").hide();
//$(".jumbotron").slideDown(3000);

$(".red-box").animate({
  "margin-left" : "+=200px"  
}, 5000, "linear");

$(".red-box").animate({
  "margin-left" : "-=200px"  
}, 5000, "linear");

//$(".red-box").animate({
//  "margin-left" : "200px",
//  "opacity" : "100",
//  "height" : "50px",
//  "width" : "50px",
//  "margin-top" : "25px"   
//}, 5000);


//$(".jumbotron").slideToggle(3000);

