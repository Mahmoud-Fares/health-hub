import React from 'react';

import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { AspectRatio } from '@/shared/components/ui/aspect-ratio';
import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';

import { Doctor } from '../api/doctor-service';

interface DoctorCardProps {
   doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
   return (
      <Card className='overflow-hidden transition-all hover:shadow-lg dark:bg-accent/75'>
         <AspectRatio ratio={16 / 9} className='bg-muted'>
            <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200'>
               {doctor.image ? (
                  <img
                     src={doctor.image}
                     alt={doctor.name}
                     className='h-full w-full object-cover'
                  />
               ) : (
                  <div className='text-4xl font-bold text-primary/30'>
                     {doctor.name.charAt(0)}
                  </div>
               )}
            </div>
         </AspectRatio>
         <CardHeader className='p-4'>
            <CardTitle className='text-lg'>{doctor.name}</CardTitle>
            <CardDescription className='flex flex-wrap gap-1'>
               {doctor.specialization.map((spec, i) => (
                  <span
                     key={i}
                     className='rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary'
                  >
                     {spec}
                  </span>
               ))}
               {doctor.specialization.length === 0 && (
                  <span className='text-xs italic text-muted-foreground'>
                     No specialization listed
                  </span>
               )}
            </CardDescription>
         </CardHeader>
         <CardContent className='space-y-2 p-4 pt-0 text-sm'>
            {doctor.clinicaddress && (
               <div className='flex items-center gap-1 text-muted-foreground'>
                  <MapPin className='h-3 w-3' />
                  <span>{doctor.clinicaddress}</span>
               </div>
            )}
            {doctor.experience_year && (
               <div className='flex items-center gap-1 text-muted-foreground'>
                  <Star className='h-3 w-3' />
                  <span>{doctor.experience_year} years experience</span>
               </div>
            )}
            {doctor.fees && (
               <div className='font-semibold text-primary'>
                  Consultation Fee: {doctor.fees}
               </div>
            )}
         </CardContent>
         <CardFooter className='p-4 pt-0'>
            <Button asChild variant='default' className='w-full'>
               <Link to={`/doctor/${doctor.slug}`}>View Profile</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default DoctorCard;
