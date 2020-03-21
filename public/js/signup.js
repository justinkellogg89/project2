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
        window.location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text("Invalid Credentials");
    $("#alert").fadeIn(500);
  }
});

function grab_data() {
  // set the apikey and limit
  $.get("/api/random/kardashian").then(function(imgURL) {
    document.getElementById("preview_gif").src = imgURL;
  });
  // data will be loaded by each call's callback
  return;
}

function getQuote() {
  //Global Vars
  var d = new Date();
  var yyyy = d.getFullYear();
  var mm = d.getMonth() + 1;
  var dd = d.getDate();
  var hh = d.getHours();
  var min = d.getMinutes();

  //console.log(yyyy, mm, dd, hh, min);

  var dateTime = mm + "/" + dd + "/" + yyyy + " " + hh + ":" + min;

  //console.log(dateTime);
  document.getElementById("currentDay").textContent =
    "QUOTE OF THE DAY          " + dateTime;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Access the result here
      //alert(this.responseText);
      var back = JSON.parse(this.response);
      console.log(back);
      console.log(back.contents.quotes[0].quote);
      console.log(back.contents.requested_author);
      outQuote = back.contents.quotes[0].quote;
      outAuthor = back.contents.requested_author;
      document.getElementById("QOD").innerHTML = outQuote;
      document.getElementById("QODSource").innerHTML = outAuthor;
      // return outTo;
    }
  };
  xhttp.open(
    "GET",
    "https://quotes.rest/quote/search?author=kim%20kardashian%20&minlength=100&maxlength=300&private=false&language=en&limit=5&sfw=false",
    true
  );
  //xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("X-Theysaidso-Api-Secret", "Svix6Lv46rgyPi54Z6Oy_weF");
  xhttp.send();
}

getQuote();
//document.getElementById("QOD").innerHTML = outTo;
grab_data();

//$(".jumbotron").hide();
//$(".jumbotron").slideDown(3000);

$(".red-box").animate(
  {
    "margin-left": "+=200px"
  },
  5000,
  "linear"
);

$(".red-box").animate(
  {
    "margin-left": "-=200px"
  },
  5000,
  "linear"
);

//$(".red-box").animate({
//  "margin-left" : "200px",
//  "opacity" : "100",
//  "height" : "50px",
//  "width" : "50px",
//  "margin-top" : "25px"
//}, 5000);

//$(".jumbotron").slideToggle(3000);
