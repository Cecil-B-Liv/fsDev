require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 2222;
const URL = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connected to MongoDB`);
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    });


// Middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieparser());


// Hello World
app.get('/', (req, res) => {
    res.status(500).send('Hello World!');
})