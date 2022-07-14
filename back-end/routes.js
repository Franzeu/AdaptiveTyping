const express = require('express');
const {test_res,getrandomtext, populate_words,store_usr_data} = require('./controllers/api_controller');

const router = express.Router();

router.get('/test', test_res);
router.get('/randomtext', getrandomtext);
router.put('/populate', populate_words);
router.post('/strusrdata',store_usr_data);
module.exports = {

    routes: router
}