import express from 'express';
import * as carController from '../controllers/carController';

const router = express.Router();

router.post('/', carController.createCar);
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.put('/:id', carController.updateCar);
router.patch('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

export default router; 