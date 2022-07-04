const express = require('express');
const {test_res,getrandomtext} = require('./controllers/api_controller');

const router = express.Router();

router.get('/test', test_res);
router.get('/randomtext', getrandomtext);
module.exports = {

    routes: router
}