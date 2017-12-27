/**
 * Created by odenza on 26/12/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    profileID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ProfileSchema'
    },
    opponent: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ProfileSchema'
    },
    game: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'CollectionSchema'
    },
    winner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ProfileSchema'
    },
    matchResult: {type: Number, min:0, max:100},
    matchDate: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('MatchSchema', MatchSchema);