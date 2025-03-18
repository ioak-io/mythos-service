const nodeCrypto = require('crypto');
const {WEBHOOK_SECRET} = require('../../../env.js');

const body = JSON.stringify({
  type: 'user.created',
  data: {
    id: 1,
    name: 'John Doe'
  }
});

const secret = 'testingWebhooks'; 
const timestamp = Math.floor(Date.now() / 1000).toString();
const id = 'evt_123';

const toSign = `${id}.${timestamp}.${body}`; 
const signature = nodeCrypto
  .createHmac('sha256', secret)
  .update(toSign)
  .digest('base64');

console.log(`webhook-id: ${id}`);
console.log(`webhook-timestamp: ${timestamp}`);
console.log(`webhook-signature: v1,${signature}`);
