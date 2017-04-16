/**
 * Created by BNB on 4/15/2017.
 */
//This will exist in place of a database solution.
module.exports = ObjectiveList = function(){
    this.list = [];
};

ObjectiveList.prototype.AddObjective = function( objective){
    objective.Id = this.list.length;
    this.list.push(objective);
};