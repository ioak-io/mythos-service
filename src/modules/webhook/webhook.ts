import { Webhook } from 'standardwebhooks';
import express from 'express';
import { WebhookEvent } from './types';
const { WEBHOOK_SECRET } = require("../../../env.js");

module.exports = function (router: any) {
    router.post('/webhook', express.json(), async (req: any, res: any): Promise<void> => {
        const webhook = new Webhook(WEBHOOK_SECRET);

        try {
            const payload = JSON.stringify(req.body);
            const signature = req.headers['webhook-signature'];

            console.log("Signature:", signature);
            console.log("Payload:", payload);

            if (!signature) throw new Error('Missing signature');

            const event = webhook.verify(payload, {
                'webhook-id': req.headers['webhook-id'],
                'webhook-timestamp': req.headers['webhook-timestamp'],
                'webhook-signature': signature
            });

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
