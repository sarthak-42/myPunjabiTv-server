const express = require('express')
const{getNewsByLanguage} = require('../controllers/newsController')

const newsRouter = express.Router()
newsRouter.get('/getNews/:lang', getNewsByLanguage)
module.exports = newsRouter