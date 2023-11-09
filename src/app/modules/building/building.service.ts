import { Building } from '@prisma/client';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingSearchableField } from './building.constant';
import { IBuildingFilters } from './building.interface';

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};
const getAllBuildings = async (
  options: IPaginationOptions,
  filters: IBuildingFilters,
): Promise<IGenericResponse<Building[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: buildingSearchableField.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.building.count({ where: whereCondition });
  return {
    meta: { page, limit, total },
    data: result,
  };
};
const getSingleBuilding = async (
  id: string | undefined,
): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: { id },
  });
  return result;
};

const updateBuilding = async (
  id: string | undefined,
  data: Partial<Building>,
): Promise<Building | null> => {
  const result = await prisma.building.update({
    where: { id },
    data,
  });
  return result;
};
const deleteBuliding = async (
  id: string | undefined,
): Promise<Building | null> => {
  const result = await prisma.building.delete({
    where: { id },
  });
  return result;
};
export const buildingService = {
  createBuilding,
  getAllBuildings,
  getSingleBuilding,
  updateBuilding,
  deleteBuliding,
};
