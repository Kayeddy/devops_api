import mongoose from 'mongoose';
import * as dbHandler from '../helpers/dbHandler';
import Car from '../../models/Car';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

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
  });

  it('should fail to save car without required fields', async () => {
    const carWithoutRequiredField = new Car({ name: 'Sedan' });
    let err;
    try {
      await carWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 