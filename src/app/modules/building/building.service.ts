import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBuilding = async (payload: Building): Promise<Building> => {
  console.log(payload);
  const result = await prisma.building.create({
    data: {
      title: 'Building-A',
    },
  });
  return result;
};

export const buildingService = {
  createBuilding,
};
