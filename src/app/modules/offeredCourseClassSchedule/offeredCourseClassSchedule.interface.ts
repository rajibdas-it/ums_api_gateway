import { WeekDays } from '@prisma/client';

export type ISlots = {
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
};

export type IClassScheduleFilters = {
  searchTerm?: string;
};
