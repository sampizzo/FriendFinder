// DEPENDENCIES
var express = require("express");

// EXPRESS SERVER CONFIGURATION
// Tells node that we are creating an "express" server
var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//api res.json()
//api post new user route

// LISTENER
// Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
