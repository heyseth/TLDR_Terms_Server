const express = require('express')
const router = express.Router()
const needle = require('needle')

// Env vars
const API_BASE_URL = process.env.API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Caching
//let cache = apicache.middleware
//router.post('/', cache('2 minutes'), async (req, res, next) => {
router.post('/', async (req, res, next) => {
  try {
    const url = `${API_BASE_URL}?key=${API_KEY_VALUE}`

    const apiRes = await needle('post', url, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${url}`)
    }

    res.status(200).json(apiRes.body)
  } catch (error) {
    next(error)
  }
})

module.exports = router
