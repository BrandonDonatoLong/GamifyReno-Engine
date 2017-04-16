/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
module.exports = User = function(userID, Password){
    this.userID = userID;
    this.password = Password;
    this.teamID = null;
    //get 10 points for creating a user
    this.userRating = 10;
};

User.prototype.setPicture = function(pictureURL){
    if (!this.userPicture){
        this.userRating += 10;
    }
    this.userPicture = pictureURL;
}

User.prototype.getPicture = function(){
    return this.userPicture;
}

User.prototype.JoinTeam = function(TeamId) {
    if (!this.teamID){
        //get 10 points for joining a team
        this.userRating += 10;
    }
    this.teamID = TeamId;
};