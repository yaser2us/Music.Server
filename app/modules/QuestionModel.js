/**
 * Created by odenza on 24/12/2017.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Question1Schema   = new Schema({
    title: String,
    type: String,
    difficulty: Boolean,
});

module.exports = mongoose.model('Question1Schema', Question1Schema);