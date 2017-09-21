var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/my-db", {useMongoClient: true});

// get rid of mongoose promise warning
mongoose.Promise = global.Promise;

// routes
var venue       = require('./apis/venue');
var location    = require('./apis/location');
var ticket      = require('./apis/ticket');
var account     = require('./apis/account');
var event       = require('./apis/event');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); /* allowing to req.body.field */

var server = require('http').Server(app);

app.use('/venue', venue);
app.use('/location', location);
app.use('/event', event);
app.use('/ticket', ticket);
app.use('/account', account);

var port = process.env.PORT || '3000';
app.set('port', port);
server.listen(port);

console.log("Starting erver, listening at port " + port);
