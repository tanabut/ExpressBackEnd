const express = require('express');

const { sequencenumber, placeapi } = require('../controllers');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send('API is working'));
router.get('/sequences', sequencenumber.getresults);
router.get('/SCG', placeapi.fiderestaurants);
//router.post('/linemessage', (req, res) => res.sendStatus(200))

module.exports = router;
