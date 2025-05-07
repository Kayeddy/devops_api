import express from 'express';
import { coordinatorWebhookHandler } from '../services/queueListener';

const router = express.Router();

// Webhook endpoint for coordinator to send messages
router.post('/webhook', coordinatorWebhookHandler);

export default router; 