/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
module.exports = Accomplishment = function(objectiveID, userID){
    this.objectiveID = objectiveID;
    this.accomplishmentID = null;
    this.userID = userID;
    this.proof = null;
    this.userRatings = [];
    this.points = 0;
    this.timestamp = Date.now();
};

Accomplishment.prototype.addProof = function(proof){
    this.proof = proof;
};

Accomplishment.prototype.incrementRating = function(userID, points){
    //if the user is not the owner and if the user has not already increased the rating.
    if (userID !== this.userID && this.userRatings.map(function(e) { return e.user; }).indexOf(userID) < 0){
        this.userRatings.push({user:userID, rating:points});
        this.points += points;
        return points;
    }
};

Accomplishment.prototype.decrementRating = function(userID){
    if (this.userRatings.map(function(e) { return e.user; }).indexOf(userID) > -1 && userID !== this.userID)
    {
        var index = this.userRatings.map(function(e) { return e.user; }).indexOf(userID)
        this.points -= this.userRatings[index].rating;
        var subtractPoints = this.userRatings[index].rating;
        this.userRatings.splice(index, 1);
        return subtractPoints;
    }
};
