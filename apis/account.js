var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

// -------------------------------
// Retrieve all accounts
// -------------------------------
router.route('/')
    .get(function(req, res) {
        Account.find({})
            .exec(function (err, data) {
                    if (err) {
                        return res.status(500).send({"error": err});
                    }
                    res.send({"data": data});
                }
            );
    })


// -----------------
// Add a new account
// -----------------

router.route('/')
  .post(function(req, res){
    if(!req.body.username || !req.body.password || !req.body.email || !req.body.phone){
      return res.status(400).send({'message': 'Must provide required fields.'});
    }

    var account = new Account();
    account.username = req.body.username;
    account.password = req.body.password;
    account.email    = req.body.email;
    account.phone    = req.body.phone;
    account.save(function(err, account){
      if(err){
        return res.status(500).send({"error": err});
      }
      return res.json({"message": "Success"});
    });
  });


// ---------------
// Find an account
// ---------------

router.route('/:id')
  .get(function(req, res){
    Account.findById(req.params.id, function(err,data){
      if(err){
        return res.status(500).send({"error": err });
      }
      return res.json({"data": data });
    })
    .populate('account');
  });

// -----------------
// Delete an account
// -----------------

router.route('/:id')
    .delete(function(req, res){
      Account.remove( {_id: req.params.id}, function(err){
        if(err){
            return res.status(500).send({"error": err});
        }
          return res.status(200).send({"message": 'Deleted account with id ' + req.params.id});
      });
    });



// ------------------------
// update an account record
// ------------------------

router.route('/:id')
    .put(function(req, res) {

      Account.findById(req.params.id , function(err, account){

        if(err){
          return res.status(500).send({"error": err});
        }

        if(req.body.username)
          account.username = req.body.username;

        if(req.body.password)
          account.password = req.body.password;

        if(req.body.email)
          account.email = req.body.email;

        if(req.body.phone)
          account.phone = req.body.phone;

        account.save(function(err, data){
          if(err){
            return res.status(500).send({"error": err});
          }

          return res.json({"message": "Record updated successfully", "data": data});

        });

      });

    })

module.exports = router;
