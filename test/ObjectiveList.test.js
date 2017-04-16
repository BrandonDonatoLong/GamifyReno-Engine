/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
var mocha = require('mocha');
var assert = require('assert');

var ObjectiveList = require('../src/ObjectiveList');
var Objective = require('../src/Objective');

var testLocation = {lat:10.0250, long:10.4870};
var LatLongNearby = {lat:10.0260, long:10.4880};
var NotLatNearby = {lat:10.0950, long:10.4880};
var NotLongNearby = {lat:10.0260, long:10.9880};
var NoneNearby = {lat:10.0950, long:10.9880};

describe("Group of Test to test objectiveList", function() {
    it("CreateObjectiveList", function () {
        var objList = new ObjectiveList()
        assert.ok(objList, "object is defined");
        assert.ok(objList.list, "list is defined");
        assert.ok(objList.list.length === 0, "List is empty");
    });

    it("add an object to a list", function(){
        var objList = new ObjectiveList();
        var obj = new Objective("Title1", "Description", testLocation, 10);
        objList.addObjective(obj);
        assert.equal(objList.list[0].id, objList.list.length-1);
        assert.equal(objList.list[0].title, "Title1");
        assert.equal(objList.list[0].description, "Description");
        assert.deepEqual(objList.list[0].location, testLocation);
    })
});

describe("objective GPS testing", function () {
    it ("single location Nearby", function () {
        var obj = new Objective("Title1", "Description", testLocation, 10);

        var nearby = obj.isNearBy(LatLongNearby);
        assert.ok(nearby);
    });

    it ("not Lat Nearby", function () {
        var obj = new Objective("Title1", "Description", testLocation, 10);

        var nearby = obj.isNearBy(NotLatNearby);
        assert.ok(!nearby);
    });

    it ("not long Nearby", function () {
        var obj = new Objective("Title1", "Description", testLocation, 10);

        var nearby = obj.isNearBy(NotLongNearby);
        assert.ok(!nearby);
    });

    it("get NearbyList", function(done){
        var objList = new ObjectiveList();
        var obj = new Objective("Title1", "Description", testLocation, 10);
        var obj2 = new Objective("Title2", "Description2", NotLatNearby);
        objList.addObjective(obj);
        objList.addObjective(obj2);

        objList.getNearbyObjectives(testLocation, function(err, result){
            assert.ifError(err);
            assert.equal(result.length, 1);
            assert.deepEqual(result[0],obj);
            done()
        });
    });
});