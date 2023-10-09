const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.get('/', async (req, res) => {
 res.send("do this: http://159.65.168.97:3001/say?keyword=hello");
});

app.get('/say', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const functionResponse = await sendMessage(keyword);
    res.send(functionResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

async function sendMessage(keyword) {
  const functionURL = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-7b550a3c-94f2-40de-b10b-abe12bfcaa12/default/assignment09/args?keyword='+keyword;
  const response = await axios.get(functionURL, {
    params: {
      keyword,
    },
  });

  return response.data;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});