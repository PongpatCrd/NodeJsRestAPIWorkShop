const express = require('express');
const path = require('path');

let app = express();

let personRoute = require('./routes/person');

app.use((req, res, next) => {
    console.log(new Date().toString() + ' => ' + req.originalUrl);

    // if have res just use res.send() but if no res use next()
    // if not use none of above user will wait for res and timeout
    next();
});
app.use(personRoute);
app.use(express.static('public'));

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!');
});

// Handler for 500 - Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info("Server has started!"));