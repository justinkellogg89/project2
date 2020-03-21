$(document).ready(function() {
let comInput = $("#com");
let comForm = $("#comForm");
// Add an event listener for when the comment form is submitted
$(comForm).on("submit", postComment);
  // A function for handling what happens when the form to create a new comment is submitted
  function postComment(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a comment
    if (!comInput.val().trim()) {
      return;
    }

    // Constructing a newCom object to hand to the database
    var newCom = {
      comment: comInput.val().trim(),
      QuoteId: comInput.attr("data-id")
    };
    
    $.post("/api/comment", newCom, function(data) {
    //   window.location.href = "/quote/" + data.id;
    location.reload();
      //console.log(data);
      //render("comment", {quote: data});
      //return;
    });
  }
});