import mongoose from 'mongoose';
import * as dbHandler from '../helpers/dbHandler';
import Car from '../../models/Car';

// Increase timeout for all tests in this file
jest.setTimeout(300000); // 5 minutes

beforeAll(async () => await dbHandler.connect(), 300000);
afterEach(async () => await dbHandler.clearDatabase(), 300000);
afterAll(async () => await dbHandler.closeDatabase(), 300000);

describe('Car Model Test', () => {
  it('should create & save car successfully', async () => {
    const validCar = new Car({
      name: 'Sedan',
      model: 'Toyota Camry'
    });
    const savedCar = await validCar.save();
    
    expect(savedCar._id).toBeDefined();
    expect(savedCar.name).toBe(validCar.name);
    expect(savedCar.model).toBe(validCar.model);
  }, 300000); // 5 minutes timeout

  it('should fail to save car without required fields', async () => {
    const carWithoutRequiredField = new Car({ name: 'Sedan' });
    let err;
    try {
      await carWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }, 300000); // 5 minutes timeout
}); 