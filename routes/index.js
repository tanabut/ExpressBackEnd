const express = require('express');

const { sequencenumber, placeapi } = require('../controllers');

const router = express.Router();

router.get('/', (req, res) => res.send('API is working'));
router.get('/sequences', sequencenumber.getresults);
router.get('/SCG', placeapi.fiderestaurants);

module.exports = router;
