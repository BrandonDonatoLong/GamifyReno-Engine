/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
//This will exist in place of a database solution.
module.exports = ObjectiveList = function(){
    this.list = [];
};

ObjectiveList.prototype.addObjective = function( objective){
    objective.id = this.list.length;
    this.list.push(objective);
};

ObjectiveList.prototype.JSONList = function(){
    return JSON.stringify(this.list)
};

ObjectiveList.prototype.getNearbyObjectives = function(currentLocation, callback){
    var result = this.list.filter(function( obj ) {
        return obj.isNearBy(currentLocation);
    });

    if (result.length === 0){
        return callback("No Nearby Objectives", null);
    }

    return callback(null, result);
};

ObjectiveList.prototype.FindObjectiveByUserCompleted = function(userid, callback){
    var result = this.list.filter(function( obj ) {
        return obj.userCompleted(userid);
    });

    if (result.length === 0){
        return callback("User Hasn't Completed this objective", null);
    }

    return callback(null, result);
}
