const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const axios = require('axios')
require('dotenv').config()
const errorHandler = require('./middleware/error')

const PORT = process.env.PORT || 5000

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

// Function to get EC2 public IP
async function getEC2PublicIP() {
  try {
    const response = await axios.get('http://169.254.169.254/latest/meta-data/public-ipv4')
    return response.data
  } catch (error) {
    // If not running on EC2 or cannot fetch IP, return localhost
    return 'localhost'
  }
}

app.listen(PORT, async () => {
  const publicIP = await getEC2PublicIP()
  const publicURL = `http://${publicIP}:${PORT}`
  console.log(`Server running on port ${PORT}`)
  console.log(`Public URL: ${publicURL}`)
  console.log(`API URL: ${publicURL}/api`)
})
