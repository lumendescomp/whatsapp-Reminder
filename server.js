const express = require('express');
const path = require('path')
const router = require('./routes/route');
const cors = require('cors')
const connectDB = require('./config/database')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const {startRoutine} = require('./cronRoutine-sendMessage')
require('dotenv').config()


const app = express();
connectDB()
app.use(express.static(path.join(__dirname, '/public')))
app.use(cors())
app.use(express.json());
app.use(router)

startRoutine()

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})

mongoose.connection.on('error', (err) => {
  console.log(err);
})
