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

      res.send({"data": data, "message": "Venue addes successfully"});

    });

  });

module.exports = router;
