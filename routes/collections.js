const {Collection , validate} = require('../models/collection');
const {Flashcard, validateFlashcard, flashcardSchema} = require('../models/flashcard');
const express = require('express');
const router = express.Router();

// POST A COLLECTION ROUTE

router.post('/collection', async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)
        return res.status(400).send(error);

        const collection = new Collection({
        title: req.body.title
        });

        await collection.save();
        const collections = await Collection.find()
        return res.send(collections);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//GET COLLECTIONS ROUTE

router.get('/collections', async (req,res)=>{
    try{
        const collection = await Collection.find();
        return res.send(collection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//GET COLLECTION BY ID ROUTE 

router.get('/:id', async (req,res)=>{
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection)
        return res.status(400).send(`The collection with the id "${req.params.id}"does not exist.`);
        
        return res.send(collection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//

router.post('/:collectionId', async (req,res)=>{
    try{
        const {error} = validateFlashcard(req.body);
        if (error) return res.status(400).send(error);
    
        const collection = await Collection.findById(req.params.collectionId);
    
        const flashcard = new Flashcard({
            question: req.body.question,
            answer: req.body.answer
        });
        
        collection.flashcards.push(flashcard);
        await collection.save();
        const collections = await Collection.find();
        return res.send(collections);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// UPDATE/PUT ROUTE

router.put('/:id', async (req,res)=>{
    try{
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const collection = await Collection.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title
            },
            {new: true }
        );

        if (!collection)
            return res.status(400).send(`The collection with the id "${req.params.id}" does not exist`);

            await collection.save();

            return res.send(collection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// DELETE COLLECTION ROUTE

router.delete('/:id', async (req,res)=>{
    try{
        const collection = await Collection.findByIdAndRemove(req.params.id);

        if(!collection)
        return res.status(400).send(`The collection with the id: "${req.params.id}" does not exist.`);

        return res.send(collection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


//UPDATE A FLASHCARD IN A COLLECTION REQUEST

router.put('/:collectionId/flashcards/:flashcardId', async (req,res)=>{
    try{
        const {error}= validateFlashcard(req.body);
        if (error) return res.status(400).send(error);

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with the Id: "${req.params.collectionId} does not exist.`);

        const flashcard = collection.flashcards.id(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The flashcard with the Id: ${req.params.flashcardId} does not exist.`)

        flashcard.question = req.body.question;
        flashcard.answer = req.body.answer;
        flashcard.dateCreated = Date.now();

        await collection.save();
        return res.send(flashcard);
    }catch (ex){
        return res.status(500).send(`Internal Server Error ${ex}`);
    }
});

//DELETE A FLASHCARD FROM A COLLECTION

router.delete('/:collectionId/flashcards/:flashcardId', async (req,res)=>{
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with the Id: "${req.params.collectionId}" does not exist.`);

        let flashcard = collection.flashcards.id(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The flashcard with the Id: "${req.params.flashcardId}" does not exist.`);

        flashcard = await flashcard.remove();

        await collection.save();
        const collections = await Collection.find()
        return res.send(collections)
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;