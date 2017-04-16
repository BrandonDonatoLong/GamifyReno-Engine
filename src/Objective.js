/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */

var GPSSensativity = 0.05;

module.exports = Objective = function(title, description, locationObj, basePoint){
    this.id = null;
    this.title = title;
    this.description = description;
    this.basePoints = basePoint || 10;
    this.usersCompleted = [];
    //this is what is going to be used to test to see if the user is the first to complete an Objective
    this.completedBefore = false;
    this.location = locationObj;
};

Objective.prototype.completeObjective = function(accompID, userID){

    var index = this.usersCompleted.map(function(e) { return e.userID; }).indexOf(userID);
    if (index === -1){
        this.usersCompleted.push({AccomplishmentID: accompID, userID: userID});
    }
};

Objective.prototype.isNearBy = function(currentLocation){
    var latDiff = Math.abs(this.location.lat - currentLocation.lat);
    var longDiff = Math.abs(this.location.long - currentLocation.long);
    if (latDiff < GPSSensativity && longDiff < GPSSensativity){
        //nearby
        return true;
    }
    else{
        return false;
    }
};

Objective.prototype.userCompleted = function(userID){
    var index = this.usersCompleted.map(function(e) { return e.userID; }).indexOf(userID);

    if ( index > -1){
        //user was found having completed this task
        return true;
    }
    else {
        return false;
    }
};

