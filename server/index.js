const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})