var express = require('express');
var router = express.Router();
var Venue = require('../models/Venue');

// -------------------------------
// Retrieve all venue
// -------------------------------
router.route('/')
    .get(function(req, res) {
        Venue.find({})
            .populate('location')
            .exec(function (err, data) {
                    if (err) {
                        return res.status(500).send({"error": err});
                    }
                    res.send({"data": data});
                }
            );
    })

// -------------------------------
// Add a new venue
// -------------------------------
router.route('/')
    .post(function(req, res){
        if (!req.body.name || !req.body.location){
            return res.status(400).send({'message': 'Must provide venue name and location.'});
        }

        var venue = new Venue();
        venue.name = req.body.name;
        venue.location = req.body.location;
        venue.save(function(err, venue){
            if(err){
                return res.status(500).send({"error": err});
            }
            return res.json({"message": "Success"});
        });
    });


// -------------------------------
// http://path-to-the-url/{id}
// -------------------------------
router.route('/:id')
    .get(function(req, res){
        Venue.findById(req.params.id , function(err, data){
                if(err){
                    return res.status(500).send({"error": err});
                }
                return res.json({ "data": data});
            })
            .populate('venue'); // changed from 'location' to 'venue'
    });

// -------------------------------
// http://path-to-the-url/{id}
// -------------------------------
router.route('/:id')
    .delete(function(req, res){
        Venue.remove( {_id: req.params.id} , function(err){
            if(err){
                return res.status(500).send({"error": err});
            }
            return res.status(200).send({"message": 'Deleted venue with id ' + req.params.id});
        });
    });


// -------------------------------
// Updating an venue record
// -------------------------------
router.route('/:id')
    .put(function(req, res) {

        Venue.findById(req.params.id , function(err, venue){

            if(err){
                return res.status(500).send({"error": err});
            }

            if (req.body.name)
                venue.name = req.body.name;

            if (req.body.location)
                venue.location = req.body.location;

            venue.save(function(err, data){
                if(err){
                    return res.status(500).send({"error": err});
                }

                return res.json({"message": "Record updated successfully", "data": data});
            });
        });
    })

module.exports = router;
