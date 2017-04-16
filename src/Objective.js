/**
 * Created by BNB on 4/15/2017.
 */
module.exports = Objective = function(title, description, basePoint){
    this.Id = null;
    this.Title = title;
    this.Description = description;
    this.BasePoints = basePoint | 10;
};
