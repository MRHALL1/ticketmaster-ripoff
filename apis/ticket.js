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
        if(!req.body.event || !req.body.location){
          return res.status(400).send({'message': 'Must provide required fields'});
        }

        var ticket = new Ticket();
        ticket.event = req.body.event;
        ticket.location = req.body.location;
        ticket.price = req.body.price;
        ticket.date = req.body.date;
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
            .populate('ticket');
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

        Ticket.findById(req.params.id , function(err, ticket){

            if(err){
                return res.status(500).send({"error": err});
            }

            if (req.body.event)
                ticket.event = req.body.event;

            if (req.body.location)
                ticket.location = req.body.location;

            if (req.body.price)
                ticket.price = req.body.price;

            if (req.body.date)
                ticket.date = req.body.date;

            ticket.save(function(err, data){
                if(err){
                    return res.status(500).send({"error": err});
                }

                return res.json({"message": "Record updated successfully", "data": data});
            });
        });
    })



module.exports = router;
