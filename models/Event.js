'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String},
  date: { type: Date },
  modified: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
