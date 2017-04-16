/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
var ObjectiveList = require('./src/ObjectiveList');
var Objective = require('./src/Objective');
var User = require('./src/User');
var UserList = require('./src/UserList');
var Accomplishment = require('./src/Accomplishments');
var AccomplishmentList = require('./src/AccomplishmentList');

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

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
//Here create a REST Api to use.


