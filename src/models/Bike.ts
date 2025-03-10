import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Bike', bikeSchema); 