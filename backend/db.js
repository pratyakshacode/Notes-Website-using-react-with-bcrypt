const mongoose = require('mongoose');
const connectToMongoose=()=>{
    mongoose.connect("mongodb://localhost/RamDb",()=>{
        console.log('mongoDB connected successfully');
    })
}

module.exports = connectToMongoose;