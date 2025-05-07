import Bike from '../models/Bike';

export const createBike = async (bikeData: { name: string; model: string }) => {
  return await Bike.create(bikeData);
};

export const getAllBikes = async () => {
  return await Bike.find();
};

export const getBikeById = async (id: string) => {
  return await Bike.findById(id);
};

export const updateBike = async (id: string, bikeData: { name?: string; model?: string }) => {
  return await Bike.findByIdAndUpdate(id, bikeData, { new: true });
};

export const deleteBike = async (id: string) => {
  return await Bike.findByIdAndDelete(id);
}; 