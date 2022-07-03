const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const route = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('api', route.routes);

app.listen(config.port, () => console.log('Backend is listening on url http://localhost:' + config.port));