import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello world from get request').status(200);
});


export default router;