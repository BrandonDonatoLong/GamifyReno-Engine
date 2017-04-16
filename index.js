/**
 * Created by BNB on 4/15/2017.
 */
var ObjectiveList = require('./src/ObjectiveList');
var Objective = require('./src/Objective');
// var objectiveList = new ObjectiveList.ObjectiveList();
var objList = new ObjectiveList();
objList.AddObjective(new Objective("Get An STD", "Go on have some fun and show some dirty people some love", 1000));
objList.AddObjective(new Objective("Get An STD Test", "Go tell your doctor you love them"));

for (var index = 0; index < objList.list.length; index++)
{
    console.log("objective", objList.list[index].Id, "data: ", objList.list[index]);
}