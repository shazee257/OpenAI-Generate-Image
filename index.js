const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
const port = 5000;
require('dotenv').config();

const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new OpenAIApi(configuration);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.post('/api/prompt', async (req, res) => {
    console.log(req.body);
    const prompt = req.body.prompt;

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512',
        });
        res.send({
            data: response.data.data[0].url,
            type: 'image',
            prompt
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


