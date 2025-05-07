import dotenv from 'dotenv';
import { ServiceBusClient } from '@azure/service-bus';
import axios from 'axios';
import User from '../models/User';
import Bike from '../models/Bike';
import Car from '../models/Car';

dotenv.config();

const connectionStr = process.env.CONNECTION_STR;
const topicName = process.env.TOPIC_NAME;
const subscriptionName = process.env.SUBSCRIPTION_NAME;
const postUrl = process.env.POST_URL;

if (!connectionStr || !topicName || !subscriptionName || !postUrl) {
  throw new Error('Missing required environment variables');
}

const sbClient = new ServiceBusClient(connectionStr);
const receiver = sbClient.createReceiver(topicName, subscriptionName);

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

const start = async () => {
  console.log(`Listening for messages on '${subscriptionName}'...`);

  receiver.subscribe({
    async processMessage(msg) {
      console.log('Message received:', msg.body);

      const message = msg.body;

      try {
        const data = await fetchFullData();

        message.data = {
          step3: {
            timestamp: new Date().toISOString(),
            ...data
          }
        };

        const enrichedMsg: EnrichedMessage = {
          message: JSON.stringify(message)
        };

        const res = await axios.post(postUrl, enrichedMsg, {
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'devops-api',
            'X-Destination': 'queue-ms'
          }
        });

        console.log('Enriched message sent successfully:', res.status);
      } catch (err) {
        console.error('Error processing or forwarding message:', err);
      }
    },

    async processError(err) {
      console.error('Error in worker:', err);
    }
  });
};

export const startQueueListener = () => {
  start().catch(console.error);
}; 