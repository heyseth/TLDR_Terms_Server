# TLDR Terms Server

Server used by the [TLDR Terms](https://github.com/heyseth/TLDR_Terms) extension for hiding API keys, rate limiting and caching. This server is used to make requests to the Gemini API and return the data to the client.

## Features

- **API Key Protection**: Hides your API keys from client-side code
- **Rate Limiting**: Prevents abuse of your API keys
- **MongoDB Caching**: Stores API responses to reduce API usage and improve response times
- **Unique Key Identification**: Uses a unique `tosKey` from each request to identify and cache responses

## Usage

### Install dependencies

```bash
npm install
```

### Set up MongoDB

This server uses MongoDB for caching API responses. You need to have MongoDB installed and running.

For detailed MongoDB setup instructions, see [MongoDB Setup Guide](mongodb-setup-guide.md).

### Configure environment variables

Rename **.env.example** to **.env** and edit the values:

- API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
- API_KEY_VALUE = "YOUR API KEY"
- MONGODB_URI = "mongodb://localhost:27017/tldr_cache"
- CACHE_EXPIRATION_DAYS = 7

### Run on http://localhost:5000

```bash
npm run dev
```