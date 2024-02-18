import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Successfully Connected to Server</h1>`)
})

// Sample get response. Customize the api call based on desired api call
app.get('/api/functionName', async(req, res) => {

    res.status(200).send('data');
})

app.listen(port, () => console.log(`Listening on port ${port}`));

