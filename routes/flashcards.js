const {Flashcard, validateFlashcard ,flashcardSchema} = require('../models/flashcard');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        const flashcard = await Flashcard.find();
        return res.send(flashcard);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//POST A FLASHCARD

router.post('/flashcard', async(req,res)=>{
    try{
        const {error} = validateFlashcard(req.body);
        if (error) return res.status(400).send(error);

        const flashcard = new Flashcard({
        question: req.body.question,
        answer: req.body.answer
        });

        await flashcard.save();
        return res.send(flashcard);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;