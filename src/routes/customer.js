let CustomerModel = require('../models/customer.model');
let express = require('express');
let router = express.Router();

// Create a new customer
// POST localhost:3000/customer
router.post('/customer', (req, res) => {
    if(!req.body){
        return res.status(400).send("Request body missing.");
    }

    let model = new CustomerModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0){
            return res.status(500).send(doc);
        }

        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

// GET a customer
// GET localhost:3000/customer
router.get('/customer', (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Missing URL parameter: email");
    }

    CustomerModel.findOne({
        email: req.query.email
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err =>{
        res.status(500).json(err);
    })
});

// Update a customer details
// PUT localhost:3000/customer
router.put('/customer', (req, res) => {
    if(!req.body.email){
        return res.status(400).send("Missing request parameter: email");
    }

    CustomerModel.findOneAndUpdate(
        {email: req.body.email},
        req.body
    )
    .then(doc => {
        res.json(doc);
    })
    .catch(err =>{
        res.status(500).json(err);
    })
});

// Delete a customer
// DELETE localhost:3000/customer
router.delete('/customer', (req, res) => {
    if(!req.body.email){
        return res.status(400).send("Missing request parameter: email");
    }

    CustomerModel.findOneAndRemove({email: req.body.email})
    .then(doc => {
        res.json(doc);
    })
    .catch(err =>{
        res.status(500).json(err);
    })
});

module.exports = router;