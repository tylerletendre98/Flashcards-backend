const {Collection , validate, collectionSchema} = require('../models/collection');
const express = require('express');
const router = express.Router();

// POST ROUTE

router.post('/', async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)
        return res.status(400).send(error);

        const collection = new Collection({
        title: req.body.title
        });

        await collection.save();
        return res.send(collection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//GET ROUTE

router.get('/', async (req,res)=>{
    try{
        const collection = await Collection.find();
        return res.send(collection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//GET BY ID ROUTE 

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

//UPDATE/PUT ROUTE

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
            return res.status(400).send(`The product with the id "${req.params.id}" does not exist`);

            await collection.save();

            return res.send(collection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;