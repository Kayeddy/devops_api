import mongoose from 'mongoose';
import * as dbHandler from '../helpers/dbHandler';
import Bike from '../../models/Bike';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

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
  });

  it('should fail to save bike without required fields', async () => {
    const bikeWithoutRequiredField = new Bike({ name: 'Mountain Bike' });
    let err;
    try {
      await bikeWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 