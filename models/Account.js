'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  modified: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', AccountSchema);
