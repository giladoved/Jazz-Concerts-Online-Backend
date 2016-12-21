'use strict';

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + '/../frontend') );

app.get('/featured', (req, res) => {
	res.send(concerts[2]);
});

app.get('/venues', (req, res) => {
	let venues = mongoUtil.venues();
	venues.find().toArray((err, docs) => {
		res.send(docs);
	});
});

app.get('/genres', (req, res) => {
	res.send(genres);
});

app.get('/recents', (req, res) => {
	res.send(concerts.slice(0, 5));
});

app.get('/concerts', (req, res) => {
	res.send(concerts);
});

app.get('/concert', (req, res) => {
	var id = req.query.id;
	var concert = concerts.filter(
      function(c){ return c.id == id }
  	);
  	if (concert.length == 0) {
  		res.status(404).send('Could not find that concert');
  	} else {
		res.send(concert[0]);
	}
});

// var venues = [
// 	{
// 		venue: "Village Vanguard",
// 		description: "NYC - lit since 1920s"
// 	},
// 	{
// 		venue: "55 Bar",
// 		description: "cozy venue blah blah"
// 	}
// ];

var genres = [
	"Fusion",
	"Modern"
];

var concerts = [
	{
		artist: "Robert Glasper Trio",
		artists: ["Robert Glasper", "Derick Hodge", "Chris Dave"],
		year: "2012",
		festival: "Jazz a la Villette Festival",
		venue: "Cite de la Musique",
		city: "Paris, France",
		genre: "Modern",
		id: "kScYtiy4PEs",
		url: "http://www.youtube.com/embed/kScYtiy4PEs?showinfo=0&rel=0"
	},
	{
		artist: "Snarky Puppy",
		artists: ["Michael League", "Robert Searight", "Nate Werth", "Larnell Lewis", "Shaun Martin", "Cory Henry", "Justin Stanton", "Bill Laurance", "Bob Lanzetti", "Chris McQueen", "Mark Lettieri", "Mike Maher", "Chris Bullock", "Jamison Ross"],
		year: "2014",
		festival: "Java Jazz Festival",
		venue: "Village Vanguard",
		city: "NYC, NY",
		genre: "Modern",
		id: "7gu8q_fJeVU",
		url: "http://www.youtube.com/embed/7gu8q_fJeVU?showinfo=0&rel=0"
	},
	{
		artist: "Weather Report",
		artists: ["Wayne Shorter", "Joe Zawinul", "Jaco Pastorius", "Peter Erskine", "Robert Thomas, Jr."],
		year: "1982",
		city: "Offenbach, Germany",
		genre: "Fusion",
		id: "ehXUyW4-hA8",
		url: "http://www.youtube.com/embed/ehXUyW4-hA8?showinfo=0&rel=0",
		tracklist: [
			["00:00", "Black Market"],
			["10:12", "Joe's intro to Scarlet Woman / Liftoff"],
			["13:27", "Scarlet Woman"],
			["19:37", "Young and Fine"],
			["26:21", "The Pursuit of the Woman with the Feathered Hat"],
			["33:11", "A Remark You Made"],
			["40:15", "River People"],
			["48:08", "Thanks for the Memories"],
			["51:55", "Dolores / Portrait of Tracy / Third Stone from the Sun"],
			["1:01:45", "Mr. Gone"],
			["1:10:24", "In a Silent Way"],
			["1:12:37", "Waterfall"],
			["1:14:27", "Teen Town"],
			["1:22:37", "I Got it Bad and That Ain't Good"],
			["1:26:00", "The Midnight Sun Will Never Set On You"],
			["1:31:26", "Birdland"],
			["1:38:15", "Introductions"],
			["1:40:02", "Fred & Jack"],
			["1:47:32", "Elegant People"],
			["1:55:28", "Badia"]
		]
	}

];

app.listen(8181, () => {
	console.log('Listening on port 8181...');
});