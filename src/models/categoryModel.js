const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    category:String,
    categoryPa:String 
});
    
module.exports = mongoose.model('Category', categorySchema)