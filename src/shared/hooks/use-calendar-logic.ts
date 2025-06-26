import { format, parse } from 'date-fns';

export const useCalendarLogic = () => {
   const getDateRestrictions = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      sevenDaysFromNow.setHours(23, 59, 59, 999);

      return { today, sevenDaysFromNow };
   };

   const isDateDisabled = (date: Date) => {
      const { today, sevenDaysFromNow } = getDateRestrictions();
      return date < today || date > sevenDaysFromNow;
   };

   const parseStringToDate = (dateString: string | null | undefined) => {
      return dateString
         ? parse(dateString, 'yyyy-MM-dd', new Date())
         : undefined;
   };

   const formatDateToString = (date: Date | null | undefined) => {
      return date ? format(date, 'yyyy-MM-dd') : null;
   };

   // For AppointmentForm popover pattern
   const formatDateForInput = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
   };

   return {
      isDateDisabled,
      parseStringToDate,
      formatDateToString,
      formatDateForInput,
      getDateRestrictions,
   };
};
