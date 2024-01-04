const express = require('express')
const {contactController} = require('../controllers/contactMailer')
const contactRouter = express.Router()
contactRouter.post('/mail', contactController)
module.exports = contactRouter