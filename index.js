/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
var ObjectiveList = require('./src/ObjectiveList');
var Objective = require('./src/Objective');
var User = require('./src/User');
var UserList = require('./src/UserList');
var Accomplishment = require('./src/Accomplishments');
var AccomplishmentList = require('./src/AccomplishmentList');

var userList = new UserList();
var AccompList = new AccomplishmentList();

var objectiveList = new ObjectiveList();

var testLocation = {lat:39.543308, long:-119.815690};

//Default stuff so there is at least one objective and user

var TestObjective = new Objective("Complete a 24 hour Hack-a-thon", "Compete a hackathon. Might I Suggest NASA Space Apps on April 29-30, 2017.", {lat:39.525451,long:-119.816723},1000);
objectiveList.addObjective(TestObjective);

var TestUser = new User("BrandonDonLong", "Abc123");
TestUser.setPicture("http://i.imgur.com/g1oNYop.jpg");
TestUser.JoinTeam("Goons");
userList.addUser(TestUser);

// BASE SETUP
// =============================================================================

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/Users', function(req, res) {
    res.json(userList.list);
});
router.get('/UserById', function(req, res){
    var userID = req.query.id;
    var user = userList.getUserById(userID);
    res.json(user);
});

router.post('/createUser', function(req, res){
   //userID, password (optional: photo, teamID)
    var user = new User(req.body.userID, req.body.password);
    userList.addUser(user);
    if (req.body.profilePhoto){
        user.setPicture(req.body.profilePhoto);
    }
    if (req.body.teamID)
    {
        user.teamID = req.body.teamID;
    }
    res.json(user);
});
router.get('/Objectives', function(req, res) {
    // Just gets a list of ALL Objectives
    res.json(objectiveList.list);
});
router.get('/ObjectiveByLocation', function(req, res) {
    //queryString `?lat=10.0254&long=10.7985`
    var currentLocation = {lat:parseFloat(req.query.lat), long:parseFloat(req.query.long)};
    objectiveList.getNearbyObjectives(currentLocation, function(err, result){
        if (err)
        {
            res.json([]);
        }
        res.json(result);
    });
});

router.get('/ObjectiveById', function(req, res) {
    // send an id and get the corresponsing objective
    var id = parseInt(req.query.id);
    var result = objectiveList.list[id];
    if (result){
        res.json(result);
    }
    else{
        res.json({});
    }
});

router.post('/PostObjective', function (req, res) {
    //"Title4", "Description", lat, long, (Optional: BasePoints)
    var title = req.body.title;
    var description = req.body.description;
    var latt = parseFloat(req.body.lat);
    var lng = parseFloat(req.body.long);
    var basePoints = parseInt(req.body.points);
    var objective = new Objective(title, description,{lat:latt, long:lng}, basePoints);
    objectiveList.addObjective(objective);
    res.json(objective);
})

router.post('/CompleteObjective', function (req, res) {
    // This call does 2 things,
    // 1.) Creates an accomplishment and adds it to the list
    // 2.) Adds the accomplishmentID created in part 1 and assigns it with a user as a completed user
    // The passed in items are ObjectiveID as id, userId and optional is a proof string
    var user = userList.getUserById(req.body.userId);
    var accomp = new Accomplishment(parseInt(req.body.id), req.body.userId);
    AccompList.addAccomplishment(accomp);
    var objective = objectiveList.list[parseInt(req.body.id)];
    objective.completeObjective(accomp.accomplishmentID, req.body.userId);
    //increment the user points
    user.userRating += objective.basePoints;

    if (req.body.proof){
        accomp.addProof(req.body.proof);
    }

    res.json({accomplishment: accomp, objective: objective, user:user});
});

router.post('/AddProof', function (req, res) {
    //This quick post function adds the proof
    // passed in is proof string and Accomplishment id = id;
    if (req.body.proof){
        var accomp = AccompList.list[parseInt(req.body.id)];
        if (accomp) {
            accomp.addProof(req.body.proof);
            return res.json(accomp);
        }
    }
    return res.json({});
});

router.post('/Rating', function (req, res) {
    // id = Accomplishment ID
    // userId = userID
    // rating = Number of points to increment by
    var accompId = parseInt(req.body.id)
    var userID = req.body.userID;
    var rating = parseInt(req.body.rating);

    var accomplishment = AccompList.findAccompById(accompId);
    if (accomplishment){
        var increaseRating = accomplishment.incrementRating(userID, rating);
        var user = userList.getUserById(accomplishment.userID);
        if (user){
            user.userRating += increaseRating;
        }
        return res.json({Accomplishment:accomplishment, user:user});
    }
    res.json({})
})

router.get('/Accomplishments', function (req, res) {
    res.json(AccompList.list);
});

router.get('/AccomplishmentByUser', function (req, res) {
    var userID = req.query.userID;
    AccompList.findAccompByUser(userID, function(err, result){
        if (err){
            return res.json(err);
        }
        res.json(result);
    })

});

router.get('/AccomplishmentByObjective', function (req, res) {
    var objID = parseInt(req.query.objectiveID);
    AccompList.findAccompByObjective(objID, function(err, result){
        if (err){
            return res.json(err);
        }
        res.json(result);
    })
})


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
//Here create a REST Api to use.


