const functions = require('firebase-functions');
const express = require('express')
const app = express();


const {helloWorld, addInfo, getInfo} = require('./handlers/info')

app.get('/', helloWorld)
app.get('/infos', getInfo)
app.post('/info', addInfo)


exports.api = functions.https.onRequest(app);