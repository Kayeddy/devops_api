import dotenv from 'dotenv';
import axios from 'axios';
import User from '../models/User';
import Bike from '../models/Bike';
import Car from '../models/Car';

dotenv.config();

// Coordinator endpoints 
const coordinatorFetchUrl = process.env.COORDINATOR_FETCH_URL || 'https://pedidos2-2.onrender.com/api/v2/subscription/coordinador';
const coordinatorSendUrl = process.env.COORDINATOR_SEND_URL || 'https://pedidos2-2.onrender.com/api/v2/send-message';

interface EnrichedMessage {
  message: string;
}

const fetchFullData = async () => {
  try {
    // Fetch all collections
    const [users, bikes, cars] = await Promise.all([
      User.find({}),
      Bike.find({}),
      Car.find({})
    ]);

    return {
      users,
      bikes,
      cars
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const pollCoordinator = async () => {
  // Poll the coordinator for new messages
  try {
    const response = await axios.get(coordinatorFetchUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching message from coordinator:', error);
    return null;
  }
};

const sendToCoordinator = async (message: any, withFailFlag: boolean) => {
  // Send enriched message back to the coordinator
  try {
    // Attach fail flag if needed
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

const start = async () => {
  console.log(`Polling coordinator at '${coordinatorFetchUrl}' for messages...`);
  setInterval(async () => {
    if (sendState === 'done') return; // Stop after both sends
    const message = await pollCoordinator();
    if (!message) return;
    console.log('Message received from coordinator:', message);
    try {
      const data = await fetchFullData();
      message.data = {
        step3: {
          timestamp: new Date().toISOString(),
          ...data
        }
      };
      if (sendState === 'waiting') {
        // First reply: send with fail flag
        await sendToCoordinator(message, true);
        sendState = 'failSent';
      } else if (sendState === 'failSent') {
        // Second reply: send without fail flag
        await sendToCoordinator(message, false);
        sendState = 'done';
      }
    } catch (err) {
      console.error('Error processing or forwarding message:', err);
    }
  }, 5000); // Poll every 5 seconds
};

export const startQueueListener = () => {
  start().catch(console.error);
}; 