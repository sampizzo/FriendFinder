// DEPENDENCIES
var friends = require("../data/friends.js");

// A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.

// A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
      });
    
      app.post("/api/friends", function(req, res) {
    
        var difference = "";
        var userMatchName = "";
        var userMatchPhoto = "";
        var userScore = req.body.scores;
    
        for (var i = 0; i < friends.length; i++) {
          var sum = 0;
          for (var j = 0; j < userScore.length; j++) {
            sum += Math.abs(friends[i].scores[j] - userScore[j]);
          }
          console.log(sum + " is the total difference for " + friends[i].name);
          if (difference === "") {
            userMatchName = friends[i].name;
            userMatchPhoto = friends[i].photo;
            difference = sum;
            console.log(friends[i].name + " is the first friend.");
          } else if (sum < difference) {
            console.log(sum + " is less than " + difference);
            userMatchName = friends[i].name;
            userMatchPhoto = friends[i].photo;
            difference = sum;
          }
          console.log(difference, userMatchName);
        }
        // console.log(userMatchName)
        friends.push(req.body);
    
        res.send({ name: userMatchName, photo: userMatchPhoto });
      });
    }