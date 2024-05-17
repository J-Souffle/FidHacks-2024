const axios = require('axios');
const openaiApiKey = 'sk-proj-uLsQArJHs8hVTQWsZvtgT3BlbkFJ1ka84BmU9YLHUbcDP77G';

// Your testAPIKey function and other code here...

async function testAPIKey() {
    try {
        const userMessage = "Hello, ChatGPT!";
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo', // Use the GPT-3.5 engine
            prompt: userMessage,
            max_tokens: 150,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openaiApiKey}`
            }
          });

        console.log('Response:', response.data.choices[0].text.trim());
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
}

testAPIKey();
