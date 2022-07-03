const express = require('express');
const {test_res} = require('./controllers/api_controller');

const router = express.Router();

router.get('/test', test_res);

module.exports = {

    routes: router
}