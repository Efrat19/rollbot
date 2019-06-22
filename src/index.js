require('dotenv').config();

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const qs = require('querystring');
const ticket = require('./ticket');
const signature = require('./verifySignature');
const debug = require('debug')('slash-command-template:index');
const K8s = require('./K8s');
const apiUrl = 'https://slack.com/api';
var morgan = require('morgan');

const app = express();
app.use(morgan('combined'));

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));


app.get('/', (req, res) => {
  res.send('<h2>The Slashhh Command and Dialog app is running</h2> <p>Follow the' +
  ' instructions in the README to configure the Slack App and your environment variables.</p>');
});

app.post('/interactive', (req, res) => {
  console.log(req);
  return res.send('got that');
});
/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post('/command', (req, res) => {
  // extract the slash command text, and trigger ID from payload
  const { text, trigger_id } = req.body;
  // Verify the signing secret
  if (signature.isVerified(req)) {

    const namespaces = ['the-face','ns'];
    if(namespaces.includes(text))
    {
      res.send('nailed it!');
    }
    else{
      res.send(K8s.getNamespaces());
    }

  } else {
    debug('Verification token mismatch');
    res.sendStatus(404);
  }
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
// app.post('/interactive', (req, res) => {
//   const body = JSON.parse(req.body.payload);

//   // check that the verification token matches expected value
//   if (signature.isVerified(req)) {
//     debug(`Form submission received: ${body.submission.trigger_id}`);

//     // immediately respond with a empty 200 response to let
//     // Slack know the command was received
//     res.send('');

//     // create Helpdesk ticket
//     ticket.create(body.user.id, body.submission);
//   } else {
//     debug('Token mismatch');
//     res.sendStatus(404);
//   }
// });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});