import { FileText, Heart, Ruler, Stethoscope, Weight } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Patient } from '@/shared/types';

type MedicalInfoProps = {
   user: Patient;
};

type MedicalInfoSectionProps = {
   title: string;
   content: string | undefined;
   icon: React.ReactNode;
   isEmpty: boolean;
};

function MedicalInfoSection({
   title,
   content,
   icon,
   isEmpty,
}: MedicalInfoSectionProps) {
   return (
      <div
         className={`group rounded-lg border p-4 transition-all duration-200 ${
            isEmpty
               ? 'border-border/30 bg-muted/20 hover:bg-muted/30'
               : 'border-border/50 bg-card hover:border-border hover:shadow-sm'
         }`}
      >
         <div className='mb-3 flex items-start gap-3'>
            <div className='mt-0.5 flex-shrink-0' aria-hidden='true'>
               {icon}
            </div>
            <h4 className='font-semibold text-foreground transition-colors group-hover:text-primary'>
               {title}
            </h4>
         </div>
         <div
            className={`pl-8 ${isEmpty ? 'text-sm italic text-muted-foreground' : 'leading-relaxed text-foreground'}`}
         >
            {content || `No ${title.toLowerCase()} recorded`}
         </div>
      </div>
   );
}

type PatientDetailProps = {
   label: string;
   value: string | number | undefined;
   unit?: string;
   icon: React.ReactNode;
   important?: boolean;
};

function PatientDetail({
   label,
   value,
   unit,
   icon,
   important = false,
}: PatientDetailProps) {
   const displayValue = value
      ? `${value}${unit ? ` ${unit}` : ''}`
      : 'Not specified';

   const isNotSpecified = !value;

   return (
      <div
         className={`flex flex-col gap-2 rounded-lg border p-4 transition-all duration-200 hover:shadow-sm md:flex-row md:items-center md:justify-between md:gap-4 ${
            important && !isNotSpecified
               ? 'border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-800/30 dark:bg-red-950/20'
               : 'border-border/50 bg-card hover:border-border'
         }`}
      >
         <div className='flex items-center gap-3'>
            {icon}
            <dt className='text-sm font-semibold text-foreground'>{label}</dt>
         </div>
         <dd className='flex items-center gap-2'>
            {!isNotSpecified && important ? (
               <Badge variant='destructive' className='font-medium'>
                  {displayValue}
               </Badge>
            ) : !isNotSpecified ? (
               <Badge variant='outline' className='font-medium'>
                  {displayValue}
               </Badge>
            ) : (
               <span className='text-sm italic text-muted-foreground'>
                  {displayValue}
               </span>
            )}
         </dd>
      </div>
   );
}

export const MedicalInfo = ({ user }: MedicalInfoProps) => {
   const patientDetails = [
      {
         label: 'Blood Type',
         value: user.blood_type,
         icon: <Heart className='h-4 w-4 text-red-500' />,
         important: true,
      },
      {
         label: 'Weight',
         value: user.weight,
         unit: 'kg',
         icon: <Weight className='h-4 w-4 text-blue-500' />,
         important: false,
      },
      {
         label: 'Height',
         value: user.height,
         unit: 'cm',
         icon: <Ruler className='h-4 w-4 text-green-500' />,
         important: false,
      },
   ];

   const medicalSections = [
      {
         title: 'Medical History',
         content: user.medical_history,
         icon: <Stethoscope className='h-5 w-5 text-blue-600' />,
         isEmpty: !user.medical_history,
      },
      {
         title: 'Notes',
         content: user.notes,
         icon: <FileText className='h-5 w-5 text-green-600' />,
         isEmpty: !user.notes,
      },
   ];

   return (
      <Card className='shadow-sm transition-shadow duration-200 hover:shadow-md'>
         <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>Medical Information</CardTitle>
         </CardHeader>
         <CardContent className='space-y-6'>
            <div className='space-y-3 md:space-y-4'>
               {patientDetails.map((detail) => (
                  <PatientDetail key={detail.label} {...detail} />
               ))}
            </div>
            <div className='space-y-4'>
               {medicalSections.map((section) => (
                  <MedicalInfoSection key={section.title} {...section} />
               ))}
            </div>
         </CardContent>
      </Card>
   );
};
