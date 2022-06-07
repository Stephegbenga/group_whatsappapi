
const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});


client.on('message', async msg => {
    

    console.log(msg);
    if(msg.from == "120363042308165692@g.us"){
        client.sendMessage("120363023264790007@g.us", msg.body)
    }else if(msg.from == "120363023264790007@g.us"){
        client.sendMessage("120363042308165692@g.us", msg.body)
    }
})
