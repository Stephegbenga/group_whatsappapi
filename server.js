const {
  Client,
  Location,
  List,
  Buttons,
  LocalAuth
} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require("express");
const axios = require('axios');

var fs = require('fs');


const app = express();


const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse request to body-parser
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(express.json()); 



const client = new Client({
  authStrategy: new LocalAuth()
});

client.initialize();


client.on('qr', (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, {
    small: true
  });
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
  uccessful
  console.error('AUTHENTICATION FAILURE', msg);
});




client.on('ready', () => {
  console.log('READY');
});





client.on('message', msg => {
  console.log(msg)
});

app.get("/", async (req, res) => {
  res.send("Second Whatsapp Api");
});


app.get("/kill", async (req, res) => {
  process.exit()
});



app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});


