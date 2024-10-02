import express from 'express';
import { dictionaryRouter } from './dictionaryRouter.js';
import { scheduleRouter } from './scheduleRouter.js';

export const apiRouter = express.Router();

apiRouter.use('/dictionary', dictionaryRouter);

apiRouter.use('/schedule', scheduleRouter);

apiRouter.all('/', (req, res) => {
    return res.status(501).send('API: Not implemented');
});

apiRouter.use('/dictionary', dictionaryRouter);