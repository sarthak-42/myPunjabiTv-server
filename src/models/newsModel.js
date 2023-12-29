const mongoose = require('mongoose')
const NewsSchema = mongoose.Schema({
    title: String,
    titlePa:String,
    description:String,
    descriptionPa:String,
    img:String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    videoUrl:String,
    createdAt:String,
   
},)
module.exports = mongoose.model("News", NewsSchema)