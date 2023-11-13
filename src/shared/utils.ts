import { ISlots } from '../app/modules/offeredCourseClassSchedule/offeredCourseClassSchedule.interface';

export const hasTimeConflict = (existingSlots: ISlots[], newSlots: ISlots) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlots.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlots.endTime}:00`);
    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
