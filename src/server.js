const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const newsRouter = require('./routes/newsRouter')
const catgoryRouter = require('./routes/categoryRouter')

const app = express()
app.use(cors());

const PORT = process.env.PORT
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/api/news',newsRouter)
app.use('/api/news',catgoryRouter)
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
