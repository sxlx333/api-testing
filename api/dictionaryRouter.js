import express from 'express';
import { isValidWord } from '../lib/isValidWord.js';
import { isInDictionary } from '../lib/isInDictionary.js';

let dictionary = [];

export const dictionaryRouter = express.Router();

dictionaryRouter.get('/', (req, res) => {
    return res.status(200).json({ dictionary });
});

dictionaryRouter.post('/', (req, res) => {
    const requiredKeys = ['word'];

    if (Object.keys(req.body).length !== requiredKeys.length) {
        return res.status(400).json({
            status: 'error',
            msg: 'Neteisingas objekto raktu kiekis',
        });
    }

    const {word} = req.body;

    const [wordValid, wordMsg] = isValidWord(word);
    if (!wordValid) {
        return res.status(400).json({
            status: 'error',  // Use 'error' for unsuccessful cases
            msg: wordMsg,
        });
    }

    const [wordFound, wordFoundMsg] = isInDictionary(word, dictionary);
    if (wordFound) {
        return res.status(400).json({
            status: 'error',
            msg: wordFoundMsg,
        });
    }

    dictionary.push(req.body.word);

    return res.status(201).json({
        status: 'success',
        msg: 'Naujas zodis priimtas sekmingai'
    });
});

// /api/dictionary/:word + BODY {newWord: 'asd'}

dictionaryRouter.put('/:word', (req, res) => {

    const { newWord } = req.body;
    const { word } = req.params;

    const [newWordValid, newWordMsg] = isValidWord(newWord);
    if (!newWordValid) {
        return res.status(400).json({
            status: 'error',  // Use 'error' for unsuccessful cases
            msg: newWordMsg,
        });
    }

    const [wordValid, wordMsg] = isValidWord(word);
    if (!wordValid) {
        return res.status(400).json({
            status: 'error',  // Use 'error' for unsuccessful cases
            msg: wordMsg,
        });
    }

    const [wordFound, wordFoundMsg] = isInDictionary(newWord, dictionary);
    if (wordFound) {
        return res.status(400).json({
            status: 'error',
            msg: wordFoundMsg,
        });
    }

    // Update the word if found in the dictionary
    for (let i = 0; i < dictionary.length; i++) {
        if (dictionary[i].toLowerCase() === word.toLowerCase()) {
            dictionary[i] = newWord;
            return res.status(200).json({
                status: 'success',
                msg: 'Zodis sekmingai pakeistas',  
            });
        }
    }

    // If the word was not found in the dictionary
    return res.status(404).json({
        status: 'error',
        msg: 'Norimas keisti zodis nerastas',
    });
});




//  http://localhost:5114/api/dictionary/zodis tas pats http://localhost:5114/api/dictionary/:word
//  http://localhost:5114/api/dictionary?word=zodis
//  http://localhost:5114/api/dictionary/1
//  http://localhost:5114/api/dictionary?id=1
//  http://localhost:5114/api/dictionary + BODY : {word: 'zodis'}

//  http://localhost:5114/api/dictionary + BODY : {word: 'zodis', count:3, color: 'red'}
//  http://localhost:5114/api/dictionary?word=zodis&count=3&color=red


dictionaryRouter.delete('/:word', (req, res) => {
    const {word} = req.params;

    const [wordValid, wordMsg] = isValidWord(word);
    if (!wordValid) {
        return res.status(400).json({
            status: 'error',  // Use 'error' for unsuccessful cases
            msg: wordMsg,
        });
    }

    const [wordFound, wordFoundMsg] = isInDictionary(word, dictionary);
    if (!wordFound) {
        return res.status(400).json({
            status: 'error',
            msg: wordFoundMsg,
        });
    }
    dictionary = dictionary.filter(fw => fw.toLowerCase() !== req.params.word.toLowerCase());

    return res.status(200).json({
        status: 'success',
        msg: 'Zodis sekmingai istrintas',
    });
});

dictionaryRouter.all('*', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'bandai kazka kas nesuplanuoti...',
    });
});