const mongoose = require('mongoose');
const Joi = require('joi');

const flashcardSchema = new mongoose.Schema({
    question: {type: String , required: true, minlength: 5, maxlength: 250},
    answer: {type: String , required: true, minlength: 2, maxlength: 250},
    dateCreated: {type: Date, default: Date.now}
});

const Flashcard = mongoose.model('flashcard', flashcardSchema);

function validateFlashcard(flashcard){
        const schema = Joi.object({
        question: Joi.string().min(5).max(250).required(),
        answer: Joi.string().min(2).max(250).required(),
    })
    return schema.validate(flashcard);
};

exports.Flashcard = Flashcard;
exports.validateFlashcard = validateFlashcard;
exports.flashcardSchema = flashcardSchema;