import express from 'express';
import * as bikeController from '../controllers/bikeController';

const router = express.Router();

router.post('/', bikeController.createBike);
router.get('/', bikeController.getBikes);
router.get('/:id', bikeController.getBikeById);
router.put('/:id', bikeController.updateBike);
router.patch('/:id', bikeController.updateBike);
router.delete('/:id', bikeController.deleteBike);

export default router; 