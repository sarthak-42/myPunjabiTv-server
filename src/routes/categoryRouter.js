const express = require('express')
const { showCategory } = require('../controllers/categoryController')
const catgoryRouter = express.Router()

catgoryRouter.get('/getCategory/:lang',showCategory)
module.exports = catgoryRouter