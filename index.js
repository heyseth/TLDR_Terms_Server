const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const connectDB = require('./db/connection')
const errorHandler = require('./middleware/error')

const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

const app = express()

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
})
app.use(limiter)
app.set('trust proxy', 1)

// Enable cors
app.use(cors())

// Parse JSON bodies
app.use(express.json())

// Set static folder
app.use(express.static('public'))

// Routes
app.use('/api', require('./routes'))

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
