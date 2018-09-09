//dependencies 
const orm = require('../config/orm');

const burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    createOne: function(cols, vals, cb){
        orm.createOne("burgers", cols, vals, function(res){
            cb(res);
        });
    },
    updateOne: function(colVals, condition, cb){
        orm.updateOne("burgers", colVals, condition, function(res) {
            cb(res);
        });
    }
}

module.exports = burger;