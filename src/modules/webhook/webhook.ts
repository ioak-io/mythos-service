import { Webhook } from 'standardwebhooks';
import express from 'express';
import { WebhookEvent } from './types';
// const { WEBHOOK_SECRET } = require("../../../env.js");

const WEBHOOK_SECRET = 'testingWebhooks';

module.exports = function (router: any) {
    router.post('/webhook', express.json(), async (req: any, res: any): Promise<void> => {
        const webhook = new Webhook(WEBHOOK_SECRET);

        try {
            const payload = JSON.stringify(req.body, Object.keys(req.body).sort());
            const signature = req.headers['webhook-signature']?.toString()?.replace(/^v1=/, '');
            const webhookId = req.headers['webhook-id']?.toString();
            const webhookTimestamp = req.headers['webhook-timestamp']?.toString();

            const toSign = `${req.headers['webhook-id']}.${req.headers['webhook-timestamp']}.${JSON.stringify(req.body, Object.keys(req.body).sort())}`;
            console.log('String to Sign (Server):', toSign);
            console.log('Computed Signature (Server):', signature);
            console.log("Payload:", payload);

            if (!signature) throw new Error('Missing signature');

            const computedSignature = require('crypto')
                .createHmac('sha256', WEBHOOK_SECRET)
                .update(`${req.headers['webhook-id']}.${req.headers['webhook-timestamp']}.${payload}`)
                .digest('base64');

            if (computedSignature !== signature) {
                throw new Error('Signature mismatch');
            }

            const event = JSON.parse(payload);

            // const event = webhook.verify(payload, {
            //     'webhook-id': webhookId,
            //     'webhook-timestamp': webhookTimestamp,
            //     'webhook-signature': signature,
            // });

            console.log("Event:", event);

            if (typeof event === 'object' && event !== null && 'type' in event) {
                const typedEvent = event as WebhookEvent;
                switch (typedEvent.type) {
                    case 'user.created':
                        console.log('✅ User created:', typedEvent.data);
                        break;
                    case 'user.updated':
                        console.log('✅ User updated:', typedEvent.data);
                        break;
                    default:
                        console.log('⚠️ Unhandled event type:', typedEvent.type);
                }
            }

            res.json({ received: true });
        } catch (err) {
            console.error('❌ Webhook verification failed:', err);
            res.status(400).json({ error: 'Webhook verification failed' });
        }
    });
};
