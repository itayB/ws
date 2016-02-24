var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/summary', function(req, res) {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/ws';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the server', err);
		}
		else {
			console.log("Connection established");

			var collection = db.collection('survey');

			collection.find({}).toArray(function(err, result) {
				if (err) {
					res.send(err);
				}
				else if (result.length) {
					res.send(result);
				}
			})
		}
	})
});

router.post('/submit', function(req, res) {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/ws';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the server', err);
		}
		else {
			console.log("Connection established");

			var collection = db.collection('survey');

			var newSurvey = {answers: req.body.answers, comments: req.body.comments};

			collection.insert([newSurvey], function (err, result) {
				if (err) {
					console.log(err);
				}
				else {
					res.redirect('/summary');
				}
			});

		}
	});	
});

module.exports = router;
