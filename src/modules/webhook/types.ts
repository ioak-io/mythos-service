export interface WebhookPayload {
    id: string;
    type: string;
    data: Record<string, any>;
    timestamp: string;
}

export interface WebhookHeaders {
    'signature': string;
    'timestamp': string;
}

export interface WebhookVerificationOptions {
    signature: string;
    timestamp: string;
}

export interface WebhookEvent {
    type: string;
    data: any;
}
