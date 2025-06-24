import {
   Calendar,
   Check,
   Clock,
   LucideIcon,
   UserRoundCheck,
} from 'lucide-react';

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/shared/components/ui/tabs';

import { AppointmentList } from '@/features/booking/components/appointment-list';
import {
   AppointmentType,
   useAppointments,
} from '@/features/booking/hooks/use-appointments';

type TabConfig = {
   value: AppointmentType;
   label: string;
   icon: LucideIcon;
};

const TAB_CONFIGS: TabConfig[] = [
   {
      value: 'pending',
      label: 'Pending',
      icon: Clock,
   },
   {
      value: 'confirmed',
      label: 'Confirmed',
      icon: Check,
   },
   {
      value: 'served',
      label: 'Served',
      icon: UserRoundCheck,
   },
];

export default function MyAppointmentsPage() {
   const { handlePageChange, getDataByType } = useAppointments();

   const renderTabContent = (type: AppointmentType) => {
      const { data, isLoading, currentPage } = getDataByType(type);

      return (
         <AppointmentList
            type={type}
            isLoading={isLoading}
            data={data}
            currentPage={currentPage}
            onPageChange={handlePageChange}
         />
      );
   };

   return (
      <Card className='animate-fade-in overflow-hidden'>
         <CardHeader className='bg-gradient-to-r from-primary/10 to-primary/5 pb-6'>
            <CardTitle className='flex items-center gap-2 text-2xl'>
               <Calendar className='h-6 w-6' />
               My Appointments
            </CardTitle>
         </CardHeader>

         <CardContent className='pt-6'>
            <Tabs defaultValue='pending' className='w-full'>
               <TabsList className='mb-6 grid w-full grid-cols-3'>
                  {TAB_CONFIGS.map(({ value, label, icon: Icon }) => (
                     <TabsTrigger
                        key={value}
                        value={value}
                        className='flex gap-2'
                     >
                        <Icon
                           size={16}
                           className={'hidden text-primary sm:flex'}
                        />
                        {label}
                     </TabsTrigger>
                  ))}
               </TabsList>

               {TAB_CONFIGS.map(({ value }) => (
                  <TabsContent
                     key={value}
                     value={value}
                     className='animate-fade-in pt-2'
                  >
                     {renderTabContent(value)}
                  </TabsContent>
               ))}
            </Tabs>
         </CardContent>
      </Card>
   );
}
