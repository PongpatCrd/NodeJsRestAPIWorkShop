let express = require('express');
let router = express.Router();

// QueryString => query property on the request object
// localhost:3000/person?name=????
router.get('/person', (req, res) => {
    if(req.query.name){
        res.send('You have requested a person ' + req.query.name);
    }
    else{
        res.send('You have requested a person');
    }
});

// Params => query property on the request object
// localhost:3000/person/????
router.get('/person/:name', (req, res) => {
    res.send('You have requested a person ' + req.params.name);
});

// Path for forced error
router.get('/error', (req, res) => {
    throw new Error('This is a forced error.');
});

module.exports = router;