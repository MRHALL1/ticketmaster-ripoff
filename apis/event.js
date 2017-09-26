var express = require('express');
var router = express.Router();
var Event = require('../models/Event');

// -------------------------------
// Retrieve all events
// -------------------------------
router.route('/')
    .get(function(req, res) {
        Event.find({})
            .exec(function (err, data) {
                    if (err) {
                        return res.status(500).send({"error": err});
                    }
                    res.send({"data": data});
                }
            );
    })


// ---------------
// Add a new event
// ---------------

router.route('/')
    .post(function(req, res){
        if(!req.body.name){
          return res.status(400).send({'Message': 'Must provide required fields.'});
        }

        var event = new Event();
        event.name = req.body.name;
        event.artist = req.body.artist;
        event.date = req.body.date;
        event.save(function(err, event){
            if(err){
                return res.status(500).send({"error": err});
            }
            return res.json({"message": "Success"});
        });
    });

// -------------
// Find an event
// -------------

router.route('/:id')
    .get(function(req, res) {
        Event.findById(req.params.id , function(err, data){
            if(err){
                return res.status(500).send({"error": err});
            }
            return res.json({ "data": data});
          })
          .populate('event');
    });


// ---------------
// Delete an event
// ---------------

router.route('/:id')
    .delete(function(req, res){
        Event.remove( {_id: req.params.id}, function(err){
            if(err){
                return res.status(500).send({"error": err});
            }
            return res.status(200).send({"message": 'Deleted event with id ' + req.params.id});
        });
    });


// ------------------------
// Updating an event record
// ------------------------

router.route('/:id')
    .put(function(req, res ){

      Event.findById(req.params.id, function(err, event){

          if(err){
            return res.status(500).send({"error": err});
          }

          if(req.body.name)
            event.name = req.body.name;

          if(req.body.artist)
            event.artist = req.body.artist;

          if(req.body.date)
            event.date = req.body.date;

          event.save(function(err, data){
              if(err){
                  return res.status(500).send({"error": err});
              }

              return res.json({"message": "Record updated successfully", "data": data});

          });
      });
    })




module.exports = router;
