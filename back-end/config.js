'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT="4000",
    HOST="localhost",
    HOST_URL="http://localhost:4000/",
    API_KEY="AIzaSyBVu8ri-X1eGYl9hGWin6K68j0txlWyoZQ",
    AUTH_DOMAIN="adaptivetyping-b4add.firebaseapp.com",
    PROJECT_ID="adaptivetyping-b4add",
    STORAGE_BUCKET="adaptivetyping-b4add.appspot.com",
    MESSAGING_SENDER_ID="243073456957",
    APP_ID="1:243073456957:web:068aaa0bd8b6f9b01e8354",
    MEASUREMENT_ID="G-XD50N8BQQ4"
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'Host is required');

module.exports = {

    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID
      }
}