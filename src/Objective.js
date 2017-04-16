/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
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

Objective.prototype.completeObjective = function(accompID, UserID){
    this.usersCompleted.push({AccomplishmentID: accompID, userID: UserID});
};

Objective.prototype.isNearBy = function(CurrentLocation){
    return
}

