/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */
module.exports = UserList = function () {
    this.list = [];
}

UserList.prototype.addUser = function(user){
    if (this.list.map(function(e) { return e.userID; }).indexOf(user.userID) > -1){
        return "Error userName already exists";
    }
    else{
        this.list.push(user);
    }
}
