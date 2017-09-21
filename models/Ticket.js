'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TicketSchema = mongoose.Schema({
  name: { type: String, required: true},
  price: { type: Number },
  modified: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

module.export = mongoose.model('Ticket', TicketSchema);
