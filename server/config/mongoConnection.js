const db = process.env.DATABASE;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/encryptcon' || db)
    .then(() => {
        console.log("MONGO Success");
    })
    .catch(err => {
        console.log("MONGO Failed", err);
    });