const express = require('express');
const app = express()
// const {PORT} = require('./configs/server.config')
require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
// const { URI } = require('./configs/db.config')
const FRONTEND_URL = process.env.FRONTEND_URL
const URI = process.env.URI
const cookie = require('cookie-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http');
const initializeSocket = require('./socket');
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
    origin: `${FRONTEND_URL}`,
    credentials: true,
}))

const server = http.createServer(app)
initializeSocket(server)
require('./routes/auth.routes')(app)
require('./routes/profile.routes')(app)
require('./routes/post.routes')(app)
require('./routes/friends.routes')(app)
require('./routes/likes.routes')(app)
require('./routes/comments.routes')(app)
server.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})