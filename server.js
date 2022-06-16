const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require("express");

var fs = require('fs');


const app = express();


const PORT = process.env.PORT || 8080;

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
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {uccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});


app.get("/", async (req, res) => {
    res.send("Whatsapp Api");
});



app.post("/sendmessage", async (req, res) => {
try{
  const numbers = req.body.numbers
  const message = req.body.message
  console.log(numbers)

  for (number of numbers){
    console.log(number)
      client.sendMessage(`${number}@c.us`, message)
  }
  res.send("Success")
}catch(error){
  console.log(error.message)
}
});


app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
