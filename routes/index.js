const express = require('express');
const router = express.Router();
const needle = require('needle');
const Cache = require('../models/Cache');

// Env vars
const API_BASE_URL = process.env.API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.post('/', async (req, res, next) => {
  try {
    let tosKey = null;
    
    // Extract tosKey from request
    try {
      tosKey = req.body.contents[0].parts[0].key;
      // Remove key from request
      delete req.body.contents[0].parts[0].key;
      //console.log(`Request with tosKey: ${tosKey}`);
    } catch (error) {
      console.log("No key found in request");
    }
    
    // If tosKey exists, check cache
    if (tosKey) {
      const cachedResponse = await Cache.findOne({ tosKey });
      
      if (cachedResponse) {
        console.log(`Cache hit for tosKey: ${tosKey}`);
        return res.status(200).json(cachedResponse.response);
      }
    }
    
    // If no cache hit or no tosKey, proceed with API request
    const url = `${API_BASE_URL}?key=${API_KEY_VALUE}`;
    
    const apiRes = await needle('post', url, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${url}`);
    }
    
    // Store response in cache if tosKey exists
    if (tosKey) {
      try {
        await Cache.findOneAndUpdate(
          { tosKey },
          { tosKey, response: apiRes.body },
          { upsert: true, new: true }
        );
        //console.log(`Cached response for tosKey: ${tosKey}`);
      } catch (error) {
        console.error(`Error caching response: ${error.message}`);
      }
    }
    
    res.status(200).json(apiRes.body);
  } catch (error) {
    next(error)
  }
})

module.exports = router
