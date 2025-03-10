import mongoose from 'mongoose';
import * as dbHandler from '../helpers/dbHandler';
import User from '../../models/User';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('User Model Test', () => {
  it('should create & save user successfully', async () => {
    const validUser = new User({
      name: 'John Doe',
      email: 'john@example.com'
    });
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.email).toBe(validUser.email);
  });

  it('should fail to save user without required fields', async () => {
    const userWithoutRequiredField = new User({ name: 'John Doe' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save user with invalid email', async () => {
    const userWithInvalidEmail = new User({
      name: 'John Doe',
      email: 'invalid-email'
    });
    let err;
    try {
      await userWithInvalidEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 