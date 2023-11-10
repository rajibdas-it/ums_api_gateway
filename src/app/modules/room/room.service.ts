import { Room } from '@prisma/client';
import calculatePagination from '../../../helper/calculatePagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { roomSearchableFields } from './room.constant';
import { IRoomFilters } from './room.interface';

const createRoom = async (data: Room): Promise<Room | null> => {
  const result = await prisma.room.create({
    data,
  });
  return result;
};

const getAllRooms = async (
  options: IPaginationOptions,
  filters: IRoomFilters,
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (filtersData && Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (searchTerm) {
    andCondition.push({
      OR: roomSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions = andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.room.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.room.count({ where: whereConditions });
  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getSingleRoom = async (id: string) => {
  const result = await prisma.room.findUnique({
    where: { id },
  });

  return result;
};
const updateRoom = async (id: string, data: Partial<Room>): Promise<Room> => {
  const result = await prisma.room.update({
    where: { id },
    data,
  });

  return result;
};
const deleteRoom = async (id: string) => {
  const result = await prisma.room.delete({
    where: { id },
  });

  return result;
};

export const roomService = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
