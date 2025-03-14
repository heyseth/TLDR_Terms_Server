const geminiDisplay = document.querySelector('.weather')
const geminiForm = document.querySelector('#weather-form')
const promptInput = document.querySelector('#city-input')

// Fetch response from Gemini API
const fetchGeminiResponse = async (prompt) => {
  const url = 'http://localhost:5000/api'

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert('Error: ' + (data.error || 'Failed to get response'))
      return
    }

    const response = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!response) {
      alert('Invalid response format')
      return  
    }

    addResponseToDOM(prompt, response)
  } catch (err) {
    alert('Error: ' + err.message)
  }
}

// Add display data to DOM
const addResponseToDOM = (prompt, response) => {
  geminiDisplay.innerHTML = `
    <h3>Prompt: "${prompt}"</h3>
    <div class="response">${response}</div>
  `
  promptInput.value = ''
}

// Event listener for form submission
geminiForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (promptInput.value === '') {
    alert('Please enter a prompt')
  } else {
    fetchGeminiResponse(promptInput.value)
  }
})

// Initial fetch with a greeting
fetchGeminiResponse('Why is grass green?')
