/**
 * Created by odenza on 25/12/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notEmpty = function (questionTitle) {
    console.log('noEmpty', questionTitle);
    if (questionTitle.length === 0) {
        return false
    }
    else {
        return true
    }
    ;
}

var QuestionSchema = new Schema({
    questionTitle: {
        type: [{
            title: {
                type: String,
                required: true,
            },
            languageCode: {
                type: String,
                required: true,
            },
            _id: false,
        }],
        required: true
    },
    questionDifficulty: {type: Number, min: 0, max: 100, default: 0},
    questionType: String,
    originalLanguage: {type: String, required: true},
    tags: {type: [String], required: true},
    answers: [{
        answerTitle: {
            type: [{
                title: String,
                languageCode: String,
                _id: false
            }], required: true
        },
        answerType: {type: String, required: true},
        correctness: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
            required: true
        },
    }],
    reference: Schema.Types.ObjectId,
    dateOfPublish: {type: Date, default: Date.now},
    //collections: {type: [Schema.Types.ObjectId]},
    // required: function() {
    //     return this.questionTitle > 0;
    // },
});

// QuestionSchema.path('questionTitle').validate(function(v) {
//     console.log('QuestionSchema',v)
//     return v.length > 0;
// });

QuestionSchema.virtual('questionTitleByLanguage').get(function (en) {
    if(this.questionTitle.length > 0){
        return this.questionTitle[0].title + en;
    }
});

QuestionSchema.virtual('fullName').get(function () {
    return this.originalLanguage + ' this is language ;)';
});

QuestionSchema.set('toObject', {
    virtuals: true
});
QuestionSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('QuestionSchema', QuestionSchema);

// {
//     "questionTitle": [{"title": "Whats is your name", "languageCode": "en"}],
//     "questionDifficulty": 10,
//     "questionType": "Text",
//     "originalLanguage": "en",
//     "tags": ["Triva","Quiz"],
//     "answers": [{
//     "answerTitle": [{"title": "Nima", "languageCode": "en"}],
//     "answerType": "Text",
//     "correctness": 100
// },{
//     "answerTitle": [{"title": "Nima", "languageCode": "en"}],
//     "answerType": "Text",
//     "correctness": 100
// },
//     {
//         "answerTitle": [{"title": "Nima", "languageCode": "en"}],
//         "answerType": "Text",
//         "correctness": 100
//     },
//     {
//         "answerTitle": [{"title": "Nima", "languageCode": "en"}],
//         "answerType": "Text",
//         "correctness": 100
//     }]
// }


