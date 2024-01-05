const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; // Choose your preferred port

app.get('/stock/:symbol', async (req, res) => {
  try {
    const stockSymbol = req.params.symbol.toUpperCase();
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        interval: '5min',
        function: 'TIME_SERIES_INTRADAY',
        symbol: stockSymbol, // Use the stock symbol from the request
        datatype: 'json',
        output_size: 'compact'
      },
      headers: {
        'X-RapidAPI-Key': '6bd3bb79c0msh441ed924409307ep1e1676jsna1aab8d31d1a',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
