const express = require('express');
const {test_res,getrandomtext, populate_words} = require('./controllers/api_controller');

const router = express.Router();

router.get('/test', test_res);
router.get('/randomtext', getrandomtext);
router.put('/populate', populate_words);
module.exports = {

    routes: router
}