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

        console.log("json users", JSON.stringify(usrList.list));

        console.log(usrList.addUser(new User("BDonLong", "ABC123")));
    })
});