const express = require('express');

const { sequencenumber, placeapi, linemessapi } = require('../controllers');

const router = express.Router();

router.get('/', (req, res) => { console.log('API is working.'); res.status(200).send('API is working.');});
router.post('/sequences', sequencenumber.getresults);
router.get('/SCG', placeapi.fiderestaurants);
router.post('/webhook', linemessapi.webhook);
router.post('/onedirection', linemessapi.onedirection);
router.get('/getlastmsgofeachuser', linemessapi.getlastmsgofeachuser);
router.post('/getmsgbyuser', linemessapi.getmsgbyuser);

module.exports = router;
