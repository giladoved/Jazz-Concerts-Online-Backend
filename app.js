'use strict';

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + '/../frontend') );

app.get('/featured', (req, res) => {
	let concerts = mongoUtil.concerts();
	var index = Math.floor(Math.random() * concerts.length);
	var concert = concerts.find().limit(1).skip(index).next((err, doc) => {
		if (err) {
			res.sendStatus(400);
		}
		res.send(doc);
	});
});

app.get('/venues', (req, res) => {
	let venues = mongoUtil.venues();
	venues.find().toArray((err, docs) => {
		if (err) {
			res.sendStatus(400);
		}
		res.send(docs);
	});
});

app.get('/genres', (req, res) => {
	let concerts = mongoUtil.concerts();
	concerts.distinct('genre', function(err, docs) {
		res.send(docs);
	});
});

app.get('/recents', (req, res) => {
	let concerts = mongoUtil.concerts();
	let recents = concerts.find().limit(5).sort({'_id':-1}).toArray((err, docs) => {
		if (err) {
			res.sendStatus(400);
		}
		res.send(docs);
	})
});

app.get('/concerts', (req, res) => {
	let concerts = mongoUtil.concerts();
	concerts.find().toArray((err, docs) => {
		if (err) {
			res.sendStatus(400);
		}
		res.send(docs);
	});
});

app.get('/concert', (req, res) => {
	let concerts = mongoUtil.concerts();
	var id = req.query.id;
	concerts.find({"id" : id}).next((err, doc) => {
		if (err) {
			res.sendStatus(400);
		}
		res.send(doc);
	});
});

app.get('/random', (req, res) => {
	let concerts = mongoUtil.concerts();
	var index = Math.floor(Math.random() * concerts.length);
	var concert = concerts.find().limit(1).skip(index).next((err, doc) => {
		if (err) {
			res.sendStatus(400);
		}
		res.send(doc.id);
	});
});

app.listen(8181, () => {
	console.log('Listening on port 8181...');
});