import mongoose from 'mongoose';
import * as dbHandler from '../helpers/dbHandler';
import Bike from '../../models/Bike';

// Increase timeout for all tests in this file
jest.setTimeout(300000); // 5 minutes

beforeAll(async () => await dbHandler.connect(), 300000);
afterEach(async () => await dbHandler.clearDatabase(), 300000);
afterAll(async () => await dbHandler.closeDatabase(), 300000);

describe('Bike Model Test', () => {
  it('should create & save bike successfully', async () => {
    const validBike = new Bike({
      name: 'Mountain Bike',
      model: 'Trek X-Caliber 8'
    });
    const savedBike = await validBike.save();
    
    expect(savedBike._id).toBeDefined();
    expect(savedBike.name).toBe(validBike.name);
    expect(savedBike.model).toBe(validBike.model);
  }, 300000); // 5 minutes timeout

  it('should fail to save bike without required fields', async () => {
    const bikeWithoutRequiredField = new Bike({ name: 'Mountain Bike' });
    let err;
    try {
      await bikeWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }, 300000); // 5 minutes timeout
}); 