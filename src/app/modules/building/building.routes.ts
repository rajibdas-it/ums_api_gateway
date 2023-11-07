import express from 'express';
import { buildingController } from './building.controller';

const router = express.Router();

router.post('/create-building/', buildingController.createBuilding);
export const buildingRoutes = router;
