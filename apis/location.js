var express = require('express');
var router = express.Router();

var Location = require('../models/Location');

// -------------------------------
// Retrieve all location
// -------------------------------
router.route('/')
    .get(function(req, res) {
        Location.find({})
            .exec(function (err, data) {
                    if (err) {
                        return res.status(500).send({"error": err});
                    }
                    res.send({"data": data});
                }
            );
    })

// ------------------
// Add a new location
// ------------------

router.route('/')
  .post(function(req, res){
    if (!req.body.name || !req.body.zip_code){
      return res.status(400).send("Name and zip_code required");
    }

    var locations = new Location();
    locations.name = req.body.name;
    locations.zip_code = req.body.zip_code;
    locations.save(function(err, data){
      if(err){
        return res.status(500).send({"error": err});
      }

      res.send({"data": data, "message": "Location added successfully"});

    });

  });


// ---------------
// Find a location
// ---------------

router.route('/:id')
  .get(function(req, res){
      Location.findById(req.params.id, function(err, data){
              if(err){
                  return res.status(500).send({"error": err});
              }
              return res.json({ "data": data});
      })
            .populate('location');
  });

// -----------------
// Delete a location
// -----------------

router.route('/:id')
    .delete(function(req, res){
        Location.remove( {_id: req.params.id}, function(err){
            if(err){
                return res.status(500).send({"error": err});
            }
            return res.status(200).send({"message": 'Deleted location with id ' + req.params.id});
        });
    });


// -----------------
// Update a location
// -----------------

router.route('/:id')
    .put(function(req, res) {

      Location.findById(req.params.id , function(err, location){

        if(err){
          return res.status(500).send({"error": err});
        }

        if(req.body.zip_code)
          location.zip_code = body.req.zip_code;

        if(req.body.name)
          location.name = body.req.name;

        location.save(function(err, data){
            if(err){
                return res.status(500).send({"error": err});
            }

            return res.json({"message": "Record updated successfully", "data": data});
        });
      });
    })



module.exports = router;
