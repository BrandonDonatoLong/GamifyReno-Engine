/**
 * Created by BNB on 4/15/2017.
 */

var mocha = require('mocha');
var assert = require('assert');

var Accomplishment = require('../src/Accomplishments');
var AccomplishmentList = require('../src/AccomplishmentList');

var testLocation = {lat:10.0250, long:10.4870};
var testNearby = {lat:10.0260, long:10.4880};
var NotNearby = {lat:10.0350, long:10.4880};

describe("test suite for accomplishments", function () {
        it("set up list of accomplishments", function(){
            var accompList = new AccomplishmentList();
            var accomp1 = new Accomplishment(0, "brandonDonLong");
            assert.equal(accomp1.userID, "brandonDonLong");
            assert.equal(accomp1.objectiveID, 0);

            accompList.addAccomplishment(accomp1);
            assert.equal(accompList.list[0].accomplishmentID, accompList.list.length-1);
            assert.deepEqual(accompList.list[0], accomp1);

            var accomp2 = new Accomplishment(1, "User2");
            accompList.addAccomplishment(accomp2);
            assert.equal(accompList.list[1].accomplishmentID, accompList.list.length-1);
            assert.deepEqual(accompList.list[1], accomp2);
        });
        it("User rating tests", function(){
            var accompList = new AccomplishmentList();
            var accomp1 = new Accomplishment(0, "brandonDonLong");
            accompList.addAccomplishment(accomp1);
            var accomp2 = new Accomplishment(1, "User2");
            accompList.addAccomplishment(accomp2);

            //should succeed
            accompList.list[0].incrementRating("user2", 4);
            assert.equal(accompList.list[0].points, 4);
            //should fail because the user is rating their own accomplishment
            accompList.list[0].incrementRating("brandonDonLong", 1);
            assert.equal(accompList.list[0].points, 4);
            //Should fail because a user is rating again
            accompList.list[0].incrementRating("user2", 3);
            assert.equal(accompList.list[0].points, 4);
            //should decrement because the user already had a rating
            accompList.list[0].decrementRating("user2");
            assert.equal(accompList.list[0].points, 0);
        })
})