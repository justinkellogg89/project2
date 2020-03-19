$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  // Getting jQuery references to the post body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var authorSelect = $("#author");

  var kards = ['Kim', 'Kris', 'Khloe'];

  var rowsToAdd = [];

  for (var i = 0; i < kards.length; i++) {
    var newAuthor = new Author(kards[i], i + 1);
    rowsToAdd.push(createAuthorRow(newAuthor));
  }

  authorSelect.empty();
  console.log(rowsToAdd);
  console.log(authorSelect);
  authorSelect.append(rowsToAdd);
  authorSelect.val(authorId);


  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }

  // Constructor function for Author objects 
  function Author(authName, authID) {
    this.name = authName;
    this.id   = authID;
  }


// Add an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // // If we have this section in our url, we pull out the post id from the url
  // // in '?post_id=1', postId is 1
  // if (url.indexOf("?post_id=") !== -1) {
  //   postId = url.split("=")[1];
  //   getPostData(postId, "post");
  // }
  // // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  // else if (url.indexOf("?author_id=") !== -1) {
  //   authorId = url.split("=")[1];
  // }

  // Getting the authors, and their posts
  //getAuthors();

  // A function for handling what happens when the form to create a new quote is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!bodyInput.val().trim() || !authorSelect.val()) {
      return;
    }

    // Constructing a newQuote object to hand to the database
    var newQuote = {
      author: kards[parseInt(authorSelect.val()) - 1],
      body: bodyInput.val().trim()
    };

    console.log(newQuote);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    // if (updating) {
    //   newPost.id = postId;
    //   updatePost(newPost);
    // }
    // else {
      submitPost(newQuote);
    // }
  }

  // Submits a new post and brings user to comment page upon completion
  function submitPost(quote) {
    $.post("/api/quote", quote, function() {
      window.location.href = "/comment";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  // function getPostData(id, type) {
  //   var queryUrl;
  //   switch (type) {
  //   case "post":
  //     queryUrl = "/api/posts/" + id;
  //     break;
  //   case "author":
  //     queryUrl = "/api/authors/" + id;
  //     break;
  //   default:
  //     return;
  //   }
  //   $.get(queryUrl, function(data) {
  //     if (data) {
  //       console.log(data.AuthorId || data.id);
  //       // If this post exists, prefill our cms forms with its data
  //       titleInput.val(data.title);
  //       bodyInput.val(data.body);
  //       authorId = data.AuthorId || data.id;
  //       // If we have a post with this id, set a flag for us to know to update the post
  //       // when we hit submit
  //       updating = true;
  //     }
  //   });
  // }

});
