import express from 'express';

const dictionary = [];

export const dictionaryRouter = express.Router();

dictionaryRouter.get('/', (req, res) => {
    return res.status(200).json({ dictionary });
});

dictionaryRouter.get('/', (req, res) => {
    return res.status(501).send('(POST) DICTIONARY: not implemented' );
});

dictionaryRouter.get('/', (req, res) => {
    return res.status(501).send('(PUT) DICTIONARY: not implemented' );
});

dictionaryRouter.get('/', (req, res) => {
    return res.status(501).send('(DELETE) DICTIONARY: not implemented' );
});
