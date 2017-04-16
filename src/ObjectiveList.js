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
}