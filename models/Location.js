'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = mongoose.Schema({
    zip_code: { type: Number, required: true},
    name: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', LocationSchema);
