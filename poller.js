// Client	-----> FIDM.com -----> google.com/calendar
// Client	-----> FIDM.com -----> google.com/calendar
// Client	-----> FIDM.com -----> google.com/calendar
// Client	-----> FIDM.com -----> google.com/calendar
// Client	-----> FIDM.com -----> google.com/calendar

// vs with a Node Js Server collecting Google Data

// Client	-----> FIDM.com

// node poller.js

var poller = require('poller');

var events = [];
// events.json
var ids = ['foo', 'bar'];

ids.map(function(id) {

	var interval = 3600000; // 1 hour
	var url = 'http://google.com/calendar/' + id;

	poller(url, {interval: interval} function (err, poll) {

		poll.on('add', function (result) {
			events.push(result);
		});

		poll.on('remove', function (result) {
			var index = events.indexOf(results);

			var removed = events.splice(index, 1);

			console.info('removed ', removed);
		});

	});
});


// public servers are locked down...