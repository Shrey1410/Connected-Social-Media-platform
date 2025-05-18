const express = require('express');
const app = express()
const {PORT} = require('./configs/server.config')
const mongoose = require('mongoose')
const { URI } = require('./configs/db.config')
const cookie = require('cookie-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

mongoose.connect(URI)
const db = mongoose.connection

db.on('error', (err)=>{
    console.log('Error connecting to database', err)
})
db.once('open', ()=>{
    console.log('Connected to datbase')
})
app.use(express.json())
app.use(cookie())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
require('./routes/auth.routes')(app)
require('./routes/profile.routes')(app)
require('./routes/post.routes')(app)
require('./routes/friends.routes')(app)
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})