import Car from '../models/Car';

export const createCar = async (carData: { name: string; model: string }) => {
  return await Car.create(carData);
};

export const getAllCars = async () => {
  return await Car.find();
};

export const getCarById = async (id: string) => {
  return await Car.findById(id);
};

export const updateCar = async (id: string, carData: { name?: string; model?: string }) => {
  return await Car.findByIdAndUpdate(id, carData, { new: true });
};

export const deleteCar = async (id: string) => {
  return await Car.findByIdAndDelete(id);
}; 