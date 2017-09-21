var express = require('express');
var router = express.Router();
var Ticket = require('../models/Ticket');

// -------------------------------
// Retrieve all tickets
// -------------------------------
router.route('/')
    .get(function(req, res) {
        Ticket.find({})
            .exec(function (err, data) {
                    if (err) {
                        return res.status(500).send({"error": err});
                    }
                    res.send({"data": data});
                }
            );
    })


// ----------------
// Add a new ticket
// ----------------

router.route('/')
    .post(function(req, res){
        if(!req.body.name){
          return res.status(400).send({'message': 'Must provide name of event'});
        }

        var ticket = new Ticket();
        ticket.name = req.body.name;
        ticket.price = req.body.price;
        ticket.save(function(err, ticket){
            if(err){
              return res.status(500).send({"error": err});
            }
            return res.json({"message": "Success"});
        });
    });



// -------------
// Find a ticket
// -------------

router.route('/:id')
    .get(function(req, res){
        Ticket.findById(req.params.id , function(err, data){
                if(err){
                    return res.status(500).send({"error": err});
                }
                return res.json({ "data": data});
            })
            .populate('venue'); // changed from 'location' to 'venue'
    });


// -------------
// Delete a ticket
// -------------

router.route('/:id')
    .delete(function(req, res){
        Ticket.remove( {_id: req.params.id} , function(err){
            if(err){
                return res.status(500).send({"error": err});
            }
            return res.status(200).send({"message": 'Deleted ticket with id ' + req.params.id});
        });
    });


// -----------------
// Updating a ticket
// -----------------

router.route('/:id')
    .put(function(req, res) {

        Ticket.findById(req.params.id , function(err, venue){

            if(err){
                return res.status(500).send({"error": err});
            }

            if (req.body.name)
                ticket.name = req.body.name;

            if (req.body.price)
                ticket.price = req.body.location;

            ticket.save(function(err, data){
                if(err){
                    return res.status(500).send({"error": err});
                }

                return res.json({"message": "Record updated successfully", "data": data});
            });
        });
    })



module.exports = router;
