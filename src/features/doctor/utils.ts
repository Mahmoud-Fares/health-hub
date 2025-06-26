import { format, isValid, parse } from 'date-fns';

export const formatAppointmentDate = (dateString: string) => {
   try {
      const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) return format(parsedDate, 'MMMM d, yyyy');

      const parsedDate2 = parse(dateString, 'yyyy-M-d', new Date());
      if (isValid(parsedDate2)) return format(parsedDate2, 'MMMM d, yyyy');

      return dateString;
   } catch (error) {
      return dateString;
   }
};
