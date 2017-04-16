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
var testLocation = {lat:10.0250, long:10.4870};
var obj = new Objective("Title1", "Description", testLocation, 10);
objectiveList.addObjective(obj);
var obj2 = new Objective("Title2", "Description", testLocation, 10);
objectiveList.addObjective(obj2);
var obj3 = new Objective("Title3", "Description", testLocation, 10);
objectiveList.addObjective(obj3);
var obj4 = new Objective("Title4", "Description", testLocation, 10);
objectiveList.addObjective(obj4);

// BASE SETUP
// =============================================================================

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/Users', function(req, res) {
    res.json(userList.list);
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
router.get('/Objective', function(req, res) {
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
    var lng = parseFloat(req.body.lat);
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
    var accomp = new Accomplishment(parseInt(req.body.id), req.body.userId);
    AccompList.addAccomplishment(accomp);
    var objective = objectiveList.list[parseInt(req.body.id)];
    objective.completeObjective(accomp.accomplishmentID, req.body.userId);

    if (req.body.proof){
        accomp.addProof(req.body.proof);
    }

    res.json({accomplishment: accomp, objective: objective});
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


