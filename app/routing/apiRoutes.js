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
        var userScore = req.body.scoresArray;
    
        for (var i = 0; i < friends.length; i++) {
          var sum = 0;
          for (var j = 0; j < userScore.length; j++) {
            sum += Math.abs(userScore[j] - friends[i].scores[j]);
          }
          if (difference === "") {
            userMatchName = friends[i].name;
            userMatchPhoto = friends[i].photo;
            difference = sum;
          } else if (sum < difference) {
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