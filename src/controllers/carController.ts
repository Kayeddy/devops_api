import { Request, Response } from 'express';
import * as carService from '../services/carService';

export const createCar = async (req: Request, res: Response) => {
  try {
    const car = await carService.createCar(req.body);
    res.status(201).json(car);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCars = async (_req: Request, res: Response) => {
  try {
    const cars = await carService.getAllCars();
    res.json(cars);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await carService.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await carService.deleteCar(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 