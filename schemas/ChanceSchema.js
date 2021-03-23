var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var chanceSchema = new Schema({
	chance: Number
});
module.exports = chanceSchema;
