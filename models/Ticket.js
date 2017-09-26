'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TicketSchema = mongoose.Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true},
  location: { type: Schema.Types.ObjectId, ref: 'Location' , required: true},
  price: { type: Number },
  date: { type: Date },
  modified: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

module.export = mongoose.model('Ticket', TicketSchema);
