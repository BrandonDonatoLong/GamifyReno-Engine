/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */

module.exports = AccomplishmentList = function () {
        this.list = [];
}

AccomplishmentList.prototype.addAccomplishment = function(accomplishment){
    accomplishment.accomplishmentID = this.list.length;
    this.list.push(accomplishment);
};

AccomplishmentList.prototype.findAccompById = function(id){
    if (this.list[id]){
        //id is a good accomplishment
        return this.list[id];
    }
    return;
}

AccomplishmentList.prototype.findAccompByUser = function(Userid , callback){
    var result = this.list.filter(function( obj ) {
        return obj.userID === Userid;
    });

    if (result.length === 0){
        return callback("Cannot Find Any Accomplishments for that user", null);
    }

    return callback(null, result);
}

AccomplishmentList.prototype.findAccompByObjective = function(objectiveId, callback){
    var result = this.list.filter(function( obj ) {
        return obj.objectiveID === objectiveId;
    });

    if (result.length === 0){
        return callback("Cannot Find Any Accomplishments for that user", null);
    }

    return callback(null, result);
}

