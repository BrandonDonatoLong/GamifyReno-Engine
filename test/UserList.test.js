/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
var mocha = require('mocha');
var assert = require('assert');

var User = require('../src/User');
var UserList = require('../src/UserList');


describe("userFunctionalTest", function(){
    it("userFunctionalTest",  function(){
        var usrList = new UserList();
        usrList.addUser(new User("BDonLong", "ABC123"));
        usrList.addUser(new User("user3", "Testme"));

        assert.equal('[{"userID":"BDonLong","password":"ABC123","teamID":null,"userRating":10},{"userID":"user3","password":"Testme","teamID":null,"userRating":10}]', JSON.stringify(usrList.list));

        assert.equal(usrList.addUser(new User("BDonLong", "ABC123")), "Error userName already exists");
    })
});