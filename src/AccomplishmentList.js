/**
 * Created by Brandon Donato-Long on 4/15/2017.
 */

module.exports = AccomplishmentList = function () {
        this.list = [];
}

AccomplishmentList.prototype.addAccomplishment = function(accomplishment){
    accomplishment.accomplishmentID = this.list.length;
    this.list.push(accomplishment);
}