$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // $.get("/api/user_data").then(function(data) {
    //   $(".member-name").text(data.email);
    // });
  
    // Getting jQuery references to the comment form
    //var bodyInput = $("#body");
    //var titleInput = $("#title");
    var cmntForm = $("#cmnt");
    //var quoteId = $("#quoteId");
  
    
  // Add an event listener for when the form is submitted
    $(cmntForm).on("submit", handleCmntFormSubmit);
      

    // A function for handling what happens when the form to create a new comment is submitted
    function handleCmntFormSubmit(event) {
      event.preventDefault();

      var bodyInput = $("#body");
      //var cmntForm = $("#cmnt");
      var quoteId = $("#quoteId");
      var userId = $("#userId");

      // Wont submit the post if we are missing a body, title, or author
      //if (!bodyInput.val().trim() || !authorSelect.val()) {
      if (!bodyInput.val().trim()) {
        return;
      }
  
      // Create a newComment object to pass to the database
      var newComment = {
        comment: bodyInput.val().trim(),
        QuoteId: parseInt(quoteId.attr("data-quoteid")),
        UserId: parseInt(userId.attr("data-userid"))
      };
  
      console.log(newComment);

      submitPost(newComment);
    }
  
    
    // Constructor function for Comment objects 
    // function Comment(comment, quoteId, ) {
    //    this.comment = comment,
    //    this.QuoteId = quoteId,
    //    this.UserId  = userId
    // }
  
    // Submits a new post and brings user to comment page upon completion
    function submitPost(comment) {
      $.post("/api/comment", comment, function() {
        window.location.href = "/unknown";
        //return;
      });
    }
  
  });
  