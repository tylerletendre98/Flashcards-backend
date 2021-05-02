const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors');
const app = express();
const collections = require('./routes/collections');
const flashcards = require('./routes/flashcards');


connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/collections', collections);
app.use('/api/flashcards', flashcards);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});