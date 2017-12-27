/**
 * Created by odenza on 25/12/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    collectionTitle: {
        type: [{
            title: String,
            languageCode: String,
            _id: false
        }],
        required: true
    },
    collectionType: String,
    originalLanguage: String,
    tags: [String],
    questions: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'QuestionSchema'
    }],
    collectionConfig: {
        collectionPlayType: {type: Number, min: 1},
        collectionPlayTime: {type: Number, min: 10},
        collectionQuestionPerPlay: {type: Number, min: 2},
        _id: false,
    },
    dateOfPublish: {type: Date, default: Date.now},
});

module.exports = mongoose.model('CollectionSchema', CollectionSchema);