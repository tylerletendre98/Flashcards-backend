const mongoose = require('mongoose');
const Joi = require('joi');

const collectionSchema = new mongoose.Schema({
    title:{type: String, required: true, minlength : 2, maxlength: 50},
    dateModified:{type: Date, default: Date.now}
});

const Collection = mongoose.model('collections', collectionSchema);

function validateCollection(collection){
    const schema = Joi.object({
        title: Joi.string().min(2).max(50),
    });
    return schema.validate(collection);
}

exports.Collection = Collection;
exports.validate = validateCollection;
exports.collectionSchema = collectionSchema;