// 4. Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.


var friends = require("../data/friends.js");

module.exports = function (app) {
    // my git request for the api
    app.get("/api/friends", function (req, res) {
        res.json(friends);

    });
// post my request to the api
    app.post("/api/friends", function (req, res) {
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
  // now convert the score into a interger instead of a sting
    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;
    var b = userScores.map(function (item) {
        return parseInt(item, 10);

    });
    userData = {
        name: req.body.name,
        photo: req.body.photo,
        scores: b
    };
    // console log the results of the info
    console.log("Name: " + userName);
    console.log("User Score " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);
    console.log("Sum of Users score " + sum);
    console.log("Best match friend diff " + bestMatch.friendDifference);
    console.log("---------------------------------------");

    // run a for loop to cycle through the friends in the data base so you can compare thenm
    for (var i = 0; i < friends.length; i++) {
        console.log(friends[i].name);        
        totalDifference = 0;
        console.log("Total Diff: " + totalDifference);
        console.log("Best match difference: " + bestMatch.friendDifference);

        var bestFriendScore = friends[i].scores.reduce((a, b) => a + b, 0);

        console.log("Total friend score: " + bestFriendScore);
        totalDifference += Math.abs(sum - bestFriendScore);
        console.log("-------> --------> " + totalDifference);

        if (totalDifference <= bestMatch.friendDifference) {

            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;

        }
        
        console.log(totalDifference + " Total Difference");
    }

    console.log(bestMatch);
    friends.push(userData);
    console.log("New User Added");
    console.log(userData);
    res.json(bestMatch);

});
};