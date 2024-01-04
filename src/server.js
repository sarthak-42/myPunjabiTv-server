const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config();
const newsRouter = require('./routes/newsRouter')
const catgoryRouter = require('./routes/categoryRouter');
const contactRouter = require('./routes/contactRouter');

const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/api/news',newsRouter)
app.use('/api/news',catgoryRouter)
app.use('/api/contact', contactRouter)
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
