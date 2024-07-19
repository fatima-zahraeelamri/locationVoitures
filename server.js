const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = new twilio(accountSid, authToken);

app.post('/send-message', (req, res) => {
  const { name, email, phone, project, subject, message } = req.body;
  
  const msg = `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nProjet: ${project}\nObjet: ${subject}\nMessage: ${message}`;
  
  client.messages.create({
    from: '+15714659927', // Twilio Sandbox WhatsApp number
    to: '+212766557077', // Your WhatsApp number
    body: msg,
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
  
  res.send('Message envoyé');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
