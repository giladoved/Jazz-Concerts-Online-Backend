'use strict';

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

module.exports = {
	connect() {
		client.connect('mongodb://localhost:27017/jazz-concerts-live-dev', (err, db) => {
			if (err) {
				console.log('Error coonnecting to database - check mongod connection');
				process.exit(1);
			}
			_db = db;
			console.log('Connected to database.');
		})
	},

	venues() {
		return _db.collection('venues');
	},

	concerts() {
		return _db.collection('concerts');
	}

};