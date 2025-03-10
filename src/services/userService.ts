import User from '../models/User';

export const createUser = async (userData: { name: string; email: string }) => {
  return await User.create(userData);
};

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateUser = async (id: string, userData: { name?: string; email?: string }) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
}; 