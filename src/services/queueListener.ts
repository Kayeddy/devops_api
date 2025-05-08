import dotenv from 'dotenv';
import axios from 'axios';
import User from '../models/User';
import Bike from '../models/Bike';
import Car from '../models/Car';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getAllUsers } from './userService';
import { getAllBikes } from './bikeService';
import { getAllCars } from './carService';

dotenv.config();

// Coordinator endpoints 
const coordinatorSendUrl = process.env.COORDINATOR_SEND_URL || 'https://pedidos2-2.onrender.com/api/v2/send-message';

interface EnrichedMessage {
  message: string;
}

const fetchFullData = async () => {
  try {
    // Ensure mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected');
    }
    // Fetch all collections using internal services
    const [users, bikes, cars] = await Promise.all([
      getAllUsers(),
      getAllBikes(),
      getAllCars()
    ]);
    return { users, bikes, cars };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const sendToCoordinator = async (message: any, withFailFlag: boolean) => {
  // Send enriched message back to the coordinator
  try {
    // Attach fail flag 
    if (withFailFlag) {
      message.failOn = 'queue-reprocessed';
      message.error = '';
    } else {
      delete message.failOn;
      delete message.error;
    }
    const payload: EnrichedMessage = {
      message: JSON.stringify(message)
    };
    const res = await axios.post(coordinatorSendUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Message sent to coordinator:', res.status, withFailFlag ? '(with fail flag)' : '(no fail flag)');
  } catch (error) {
    console.error('Error sending message to coordinator:', error);
  }
};

// State: 'waiting' -> 'failSent' -> 'done'
let sendState: 'waiting' | 'failSent' | 'done' = 'waiting';

/**
 * Express handler for coordinator webhook
 */
export const coordinatorWebhookHandler = async (req: Request, res: Response) => {
  if (sendState === 'done') {
    return res.status(200).json({ status: 'done', message: 'No further action taken.' });
  }
  const message = req.body;
  console.log('Webhook message received from coordinator:', message);
  try {
    const data = await fetchFullData();
    message.data = {
      step3: {
        timestamp: new Date().toISOString(),
        ...data
      }
    };
    if (sendState === 'waiting') {
      await sendToCoordinator(message, true);
      sendState = 'failSent';
      return res.status(200).json({ status: 'failSent', message: 'Sent with fail flag.' });
    } else if (sendState === 'failSent') {
      await sendToCoordinator(message, false);
      sendState = 'done';
      return res.status(200).json({ status: 'done', message: 'Sent without fail flag.' });
    }
  } catch (err) {
    console.error('Error processing or forwarding message:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 