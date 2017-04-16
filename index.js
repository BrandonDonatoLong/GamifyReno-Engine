/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
var ObjectiveList = require('./src/ObjectiveList');
var Objective = require('./src/Objective');
var User = require('./src/User');
var UserList = require('./src/UserList');
var Accomplishment = require('./src/Accomplishments');
var AccomplishmentList = require('./src/AccomplishmentList');

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
router.get('/User', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.get('/Objective', function(req, res) {
    res.json(objectiveList.list);
});
router.get('/ObjectiveByLocation', function(req, res) {
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
    var id = parseInt(req.query.id);
    var result = objectiveList.list[id];
    if (result){
        res.json(result);
    }
    else{
        res.json({});
    }
});

router.post('/CompleteObjective', function (req, res) {
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


