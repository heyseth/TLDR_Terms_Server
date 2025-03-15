# TLDR Terms Server

Server used by the [TLDR Terms](https://github.com/heyseth/TLDR_Terms) extension for hiding API keys, rate limiting and caching. This server is used to make requests to the Gemini API and return the data to the client.

## Usage

### Install dependencies

```bash
npm install
```

### Run on http://localhost:5000

```bash
npm run dev
```

### Add public API info

Rename **.env.example** to **.env** and edit the values

- API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
- API_KEY_NAME = "key"
- API_KEY_VALUE = "YOUR API KEY"