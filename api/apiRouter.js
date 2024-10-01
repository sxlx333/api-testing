import express from 'express';
import { dictionaryRouter } from './dictionaryRouter.js';

export const apiRouter = express.Router();

apiRouter.all('/', (req, res) => {
    return res.status(501).send('API: Not implemented');
});

apiRouter.use('/dictionary', dictionaryRouter);