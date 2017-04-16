/**
 * Created by BNB on 4/15/2017.
 */
var mocha = require('mocha');
var assert = require('assert');

var ObjectiveList = require('../src/ObjectiveList');
var Objective = require('../src/Objective');

var testLocation = {lat:10.0250, long:10.4870};
var testNearby = {lat:10.0260, long:10.4880};
var NotNearby = {lat:10.0350, long:10.4880};

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