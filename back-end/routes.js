const express = require('express');
const {getTopMistakes, getrandomadapttext, getrandomtext, populate_words,store_usr_data,get_usr_data} = require('./controllers/api_controller');

const router = express.Router();

router.get('/mistakes/:id',getTopMistakes);
router.get('/randomtext/:id', getrandomadapttext);
router.get('/randomtext', getrandomtext);
router.get('/gtusrdata', get_usr_data);
router.put('/populate', populate_words);
router.post('/strusrdata',store_usr_data);
module.exports = {

    routes: router
}