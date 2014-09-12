var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var events = [];

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/events.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(events));
  console.info('events: ', events);
});

app.post('/events.json', function(req, res) {
  events.push(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(events));
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
