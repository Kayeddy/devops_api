import express from 'express';
import { coordinatorWebhookHandler, resetState } from '../services/queueListener';

const router = express.Router();

// Webhook endpoint for coordinator to send messages
router.post('/webhook', coordinatorWebhookHandler);

// Reset state endpoint to start the process over
router.get('/reset', resetState);

export default router; 