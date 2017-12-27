// server.js

// BASE SETUP
// =============================================================================

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/NewMongo', {
mongoose.connect('mongodb://admin:Octove2015@ds131997.mlab.com:31997/musicapp', {
    useMongoClient: true,
    /* other options */
});

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("DB connection alive");
});

var QuestionSchema = require('./app/modules/Question');
var CollectionSchema = require('./app/modules/Collection');
var ProfileSchema = require('./app/modules/Profile');
var MatchSchema = require('./app/modules/Match');


// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/matches')
    .get(function (req, res) {
        MatchSchema.
        find().
        populate('opponent','profileDisplayName').
        exec(function (err, story) {
            if (err) return res.send(err);
            console.log('The author is %s', story);
            res.json(story);
            // prints "The author is Ian Fleming"
        });


    })
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        console.log("DB connection alive", req.body);

        var match = new MatchSchema();      // create a new instance of the Bear model
        var model = req.body;
        match.matchResult = model.matchResult;
        match.winner = model.winner;
        match.profileID = model.profileID;
        match.opponent = model.opponent;
        match.game = model.game;

        console.log("model", model);

        // save the bear and check for errors
        var promise = match.save();

        promise.then(function (doc) {
            console.log(doc, 'doc ;)');
            res.json({message: 'Bear created!', title: doc.matchResult});
        });

    });

// more routes for our API will happen here
router.route('/matches')
    .get(function (req, res) {
        ProfileSchema.
        find().
        exec(function (err, story) {
            if (err) return res.send(err);
            console.log('The author is %s', story);
            res.json(story);
            // prints "The author is Ian Fleming"
        });


    })
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        console.log("DB connection alive", req.body);

        var profile = new ProfileSchema();      // create a new instance of the Bear model
        var model = req.body;
        profile.profileDisplayName = model.profileDisplayName;
        profile.profileEmail = model.profileEmail;

        console.log("model", model);

        // save the bear and check for errors
        var promise = profile.save();

        promise.then(function (doc) {
            console.log(doc, 'doc ;)');
            res.json({message: 'Bear created!', title: doc.profileEmail});
        });

    });

router.route('/profiles')
    .get(function (req, res) {
        ProfileSchema.
        find().
        exec(function (err, story) {
            if (err) return res.send(err);
            console.log('The author is %s', story);
            res.json(story);
            // prints "The author is Ian Fleming"
        });


    })
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        console.log("DB connection alive", req.body);

        var profile = new ProfileSchema();      // create a new instance of the Bear model
        var model = req.body;
        profile.profileDisplayName = model.profileDisplayName;
        profile.profileEmail = model.profileEmail;

        console.log("model", model);

        // save the bear and check for errors
        var promise = profile.save();

        promise.then(function (doc) {
            console.log(doc, 'doc ;)');
            res.json({message: 'Bear created!', title: doc.profileEmail});
        });

    });

router.route('/collections/:tag')
    .get(function (req, res) {
        CollectionSchema.find({'tags': req.params.tag}, function (err, bear) {
            if (err)
                res.send(err);
            console.log('tag', bear);
            res.json(bear);
        });
    });

router.route('/collections')
    .get(function (req, res) {

        // var personSchema = Schema({
        //     name: String,
        //     age: Number,
        //     stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
        // });
        //
        // var storySchema = Schema({
        //     author: { type: Schema.Types.ObjectId, ref: 'Person' },
        //     title: String,
        //     fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
        // });
        //
        // var Story = mongoose.model('Story', storySchema);
        // var Person = mongoose.model('Person', personSchema);
        //
        // var author = new Person({
        //     name: 'Ian Fleming',
        //     age: 50
        // });
        //
        // var promise = author.save();
        //
        // promise.then(function (doc) {
        //     console.log(doc, 'doc ;)');
        //     var story1 = new Story({
        //         title: 'Casino Royale',
        //         author: doc._id    // assign the _id from the person
        //     });
        //
        //     story1.save(function (err) {
        //         //if (err) return handleError(err);
        //         // thats it!
        //         console.log(err,'story error');
        //     });
        // });

        // Story.
        // findOne({ title: 'Casino Royale' }).
        // populate('author').
        // exec(function (err, story) {
        //     //if (err) return handleError(err);
        //     console.log('The author is %s', story);
        //
        //     res.json(story);
        //
        //     // prints "The author is Ian Fleming"
        // });

        // var result = CollectionSchema.aggregate([
        //     {
        //         $unwind: "$QuestionSchema"
        //     },
        //     { "$lookup": {
        //         "from": "QuestionSchema",
        //         "localField": "_id",
        //         "foreignField": "_id",
        //         "as": "twoItems"
        //     }},
        //     {
        //         $match: { "questions": { $ne: [] } }
        //     }
        // ], function (err, result) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log(result,'aggregate');
        //     res.json(result);
        // });

        // result.then(function (err, story){
        //     console.log(story,'aggregate');
        //     res.json(story);
        // })


        CollectionSchema.
        find().
        populate('questions').
        exec(function (err, story) {
            if (err) return res.send(err);
            console.log('The author is %s', story);
            res.json(story);
            // prints "The author is Ian Fleming"
        });


    })
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {

        console.log("DB connection alive", req.body);


        var collection = new CollectionSchema();      // create a new instance of the Bear model
        var model = req.body;
        collection.tags = model.tags;
        collection.originalLanguage = model.originalLanguage;
        collection.collectionConfig = model.collectionConfig;
        collection.collectionTitle = model.collectionTitle;
        collection.collectionType = model.collectionType;
        collection.correctQuestion = model.correctQuestion;

        collection.questions = model.questions;

        QuestionSchema.find(function (err, collections) {
            console.log(collections[0]._id);
            collection.questions.push(collections[0]._id);
            collection.questions.push(collections[1]._id);
            collection.questions.push(collections[2]._id);
            collection.questions.push(collections[3]._id);

            //collection.correctQuestion = collections[0]._id;





        });


        console.log("model", model);


        //console.log("DB connection alive", req.body, res, model);

        // save the bear and check for errors
        var promise = collection.save();

        promise.then(function (doc) {
            console.log(doc, 'doc ;)');
            res.json({message: 'Bear created!', title: doc.collectionTitle[0].title});
        });

        // bear.save(function(err) {
        //     if (err)
        //         res.send(err);
        //
        //     res.json({ message: 'Bear created!', name: bear.name });
        // });

    });

router.route('/questions')
    .get(function (req, res) {
        QuestionSchema.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    })
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {

        //console.log("DB connection alive", req.body);


        var question = new QuestionSchema();      // create a new instance of the Bear model
        var model = req.body;
        //console.log("model", model);

        question.questionTitle = model.questionTitle;

        question.originalLanguage = model.originalLanguage;
        question.questionDifficulty = model.questionDifficulty;
        question.questionTitle = model.questionTitle;
        question.answers = model.answers;
        question.questionType = model.questionType;
        question.tags = model.tags;

        var error = question.validateSync();
        console.log(error, 'error');

        //console.log("DB connection alive", req.body, res, model);

        // save the bear and check for errors
        var promise = question.save();

        promise.then(function (doc) {
            console.log(doc, 'doc ;)');
            res.json({message: 'Bear created!', title: doc.title});
        });

        // bear.save(function(err) {
        //     if (err)
        //         res.send(err);
        //
        //     res.json({ message: 'Bear created!', name: bear.name });
        // });

    });

router.route('/question/:id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        QuestionSchema.findById(req.params.id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function (req, res) {
        // use our bear model to find the bear we want
        QuestionSchema.findById(req.params.id, function (err, bear) {

            if (err)
                res.send(err);

            bear.title = req.body.title;  // update the bears info

            // save the bear
            bear.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Bear updated!'});
            });
        });
    })
    .delete(function (req, res) {
        QuestionSchema.remove({
            _id: req.params.id
        }, function (err, bear) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted', deletedObject: bear});
        });

    });

router.route('/question/lang/:id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        QuestionSchema.find({'originalLanguage': req.params.id}, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });

router.route('/question/specific/lang/:id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        QuestionSchema.find({'questionTitle.languageCode': req.params.id}, function (err, bear) {
            if (err)
                res.send(err);
            console.log('fullname', bear);
            res.json(bear);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);