import express from 'express';
import { buildingController } from './building.controller';

const router = express.Router();

router.post('/create-building/', buildingController.createBuilding);
router.get('/', buildingController.getAllBuildings);
router.get('/:id', buildingController.getSingleBuilding);

export const buildingRoutes = router;
