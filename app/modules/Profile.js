/**
 * Created by odenza on 26/12/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    profileDisplayName: {type: String, required: true},
    profileEmail: {type: String, required: true},
    profilePhoto: {type: String, default:'https://start.jcolemorrison.com/content/images/2014/Apr/orange-cole-square-1.png'},
    // profileScore: {type: Number, required: true, min:0, default:100},
    profileRegistrationDate: {type: Date, default: Date.now()},
    profileBio: {type: String},
    profileVIP: {type: Boolean, default: false},
    profileScore: {
        weeklyScore: {type: Number, min:0},
        allScore: {type: Number, min:0}
    },
    profileBadges: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'BadgeSchema'
    }],
    profileAchievements: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AchievementSchema'
    }],
    profileLikes: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ReferenceSchema'
    }],
    profileOpponents: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'MatchSchema'
    }],
});

module.exports = mongoose.model('ProfileSchema', ProfileSchema);