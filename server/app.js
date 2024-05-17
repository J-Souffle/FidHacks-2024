const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Prediction route
app.post('/predict', async (req, res) => {
  const imageUrl = req.body.imageUrl;
  
  try {
    const response = await axios.post('https://bitcamp24cv-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/208e9081-a204-49b8-ae65-cd8e6a94a8a4/detect/iterations/Iteration4/image', {
      url: imageUrl,
      // Add any other necessary parameters
    }, {
      headers: {
        'Prediction-Key': '1d87c1bd5e6b46f4b72ec7c802390442',
        'Content-Type': 'application/json'
      }
    });
    
    const predictions = response.data.predictions;
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Bitcamp 2024 Bridge Analysis App!');
});

// Error handling middleware - Log errors to console
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
