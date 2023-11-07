import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};
const getAllBuildings = async (): Promise<Building[]> => {
  const result = await prisma.building.findMany({});
  return result;
};
const getSingleBuilding = async (
  id: string | undefined,
): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: { id },
  });
  return result;
};

export const buildingService = {
  createBuilding,
  getAllBuildings,
  getSingleBuilding,
};
