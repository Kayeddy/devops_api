import mongoose from 'mongoose';
import * as dbHandler from '../helpers/dbHandler';
import User from '../../models/User';

// Increase timeout for all tests in this file
jest.setTimeout(300000); // 5 minutes

beforeAll(async () => await dbHandler.connect(), 300000);
afterEach(async () => await dbHandler.clearDatabase(), 300000);
afterAll(async () => await dbHandler.closeDatabase(), 300000);

describe('User Model Test', () => {
  it('should create & save user successfully', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
  }, 300000); // 5 minutes timeout

  it('should fail to save user without required fields', async () => {
    const userWithoutRequiredField = new User({ name: 'John Doe' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }, 300000); // 5 minutes timeout

  it('should fail to save user with invalid email', async () => {
    const userWithInvalidEmail = new User({ name: 'John Doe', email: 'invalid-email' });
    let err;
    try {
      await userWithInvalidEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }, 300000); // 5 minutes timeout
}); 