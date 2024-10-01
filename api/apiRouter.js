import express from 'express'; 
import { dictionaryRouter } from './dictionaryRounter.js';

export const apiRouter = express.Router(); 

apiRouter.all('/', (req, res) => {
    return res.status(501).send('Not implemented');
});

apiRouter.use('/dictionary', dictionaryRouter);
