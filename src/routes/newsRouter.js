const express = require('express')
const{getNewsByLanguage, getNewsById} = require('../controllers/newsController')

const newsRouter = express.Router()
newsRouter.get('/getNews/:lang', getNewsByLanguage)
newsRouter.get('/getnews/:lang/:id',getNewsById)
module.exports = newsRouter