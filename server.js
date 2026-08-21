require('dotenv').config();
const express = require('express');
const cors = require('cors');
const collectionsRouter = require('./routes/collections');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Wanderly backend is running!');
});

app.use('/api/collections', collectionsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});