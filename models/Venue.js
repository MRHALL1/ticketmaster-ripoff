'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VenueSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location' , required: true},
    modified: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venue', VenueSchema);
