import { Request, Response } from 'express';
import * as bikeService from '../services/bikeService';

export const createBike = async (req: Request, res: Response) => {
  try {
    const bike = await bikeService.createBike(req.body);
    res.status(201).json(bike);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBikes = async (_req: Request, res: Response) => {
  try {
    const bikes = await bikeService.getAllBikes();
    res.json(bikes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBikeById = async (req: Request, res: Response) => {
  try {
    const bike = await bikeService.getBikeById(req.params.id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.json(bike);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBike = async (req: Request, res: Response) => {
  try {
    const bike = await bikeService.updateBike(req.params.id, req.body);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.json(bike);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBike = async (req: Request, res: Response) => {
  try {
    const bike = await bikeService.deleteBike(req.params.id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.json({ message: 'Bike deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 