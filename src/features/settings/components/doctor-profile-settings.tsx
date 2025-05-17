import { useState } from 'react';

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Textarea } from '@/shared/components/ui/textarea';

import { useAuth } from '@/features/auth';

import { useUpdateProfile } from '../api/hooks';
import { DoctorUpdatePayload } from '../api/service';

interface DoctorProfileProps {
   activeTab: string;
}

export const DoctorProfileSettings = ({ activeTab }: DoctorProfileProps) => {
   const { currentUser } = useAuth();
   const [specialties, setSpecialties] = useState<string[]>(
      currentUser?.specialization || []
   );
   const [newSpecialty, setNewSpecialty] = useState('');
   const { mutate: updateProfile, isPending } = useUpdateProfile();

   const personalForm = useForm<{
      name: string;
      email: string;
      phone: string;
      age: string;
      gender: string;
   }>({
      defaultValues: {
         name: currentUser?.name || '',
         email: currentUser?.email || '',
         phone: currentUser?.phone || '',
         age: currentUser?.age?.toString() || '',
         gender: currentUser?.gender || 'male',
      },
   });

   const professionalForm = useForm<{
      bio: string;
      fees: string;
   }>({
      defaultValues: {
         bio: currentUser?.bio || '',
         fees: currentUser?.fees || '',
      },
   });

   const clinicForm = useForm<{
      clinicname: string;
      clinicaddress: string;
      clinicgovernate: string;
   }>({
      defaultValues: {
         clinicname: currentUser?.clinicname || '',
         clinicaddress: currentUser?.clinicaddress || '',
         clinicgovernate: currentUser?.clinicgovernate || '',
      },
   });

   const handleAddSpecialty = () => {
      if (!newSpecialty.trim()) return;

      if (specialties.includes(newSpecialty.trim())) {
         toast.error('This specialty already exists');
         return;
      }

      setSpecialties((prev) => [...prev, newSpecialty.trim()]);
      setNewSpecialty('');
   };

   const handleRemoveSpecialty = (specialty: string) => {
      toast('Not fully implemented', {
         description:
            'Specialty removal will be implemented in the next version',
      });
      setSpecialties((prev) => prev.filter((s) => s !== specialty));
   };

   const onSubmitPersonal = (values: any) => {
      const payload: DoctorUpdatePayload = {
         name: values.name,
         email: values.email,
         phone: values.phone,
         age: values.age ? parseInt(values.age) : null,
         gender: values.gender,
      };
      updateProfile(payload);
   };

   const onSubmitProfessional = (values: any) => {
      const payload: DoctorUpdatePayload = {
         bio: values.bio,
         fees: values.fees,
         specialization: specialties,
      };
      updateProfile(payload);
   };

   const onSubmitClinic = (values: any) => {
      const payload: DoctorUpdatePayload = {
         clinicname: values.clinicname,
         clinicaddress: values.clinicaddress,
         clinicgovernate: values.clinicgovernate || null,
      };
      updateProfile(payload);
   };

   if (activeTab === 'personal') {
      return (
         <Card className='w-full'>
            <CardContent className='pt-6'>
               <Form {...personalForm}>
                  <form
                     onSubmit={personalForm.handleSubmit(onSubmitPersonal)}
                     className='space-y-6'
                  >
                     <FormField
                        control={personalForm.control}
                        name='name'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='Dr. Full Name'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='email'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='your@email.com'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='phone'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                 <Input placeholder='01234567890' {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='age'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                 <Input
                                    type='number'
                                    placeholder='35'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={personalForm.control}
                        name='gender'
                        render={({ field }) => (
                           <FormItem className='space-y-3'>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                 <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-row space-x-4'
                                 >
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                       <FormControl>
                                          <RadioGroupItem value='male' />
                                       </FormControl>
                                       <FormLabel className='font-normal'>
                                          Male
                                       </FormLabel>
                                    </FormItem>
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                       <FormControl>
                                          <RadioGroupItem value='female' />
                                       </FormControl>
                                       <FormLabel className='font-normal'>
                                          Female
                                       </FormLabel>
                                    </FormItem>
                                 </RadioGroup>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type='submit' disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save Personal Info'}
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      );
   }

   if (activeTab === 'professional') {
      return (
         <Card className='w-full'>
            <CardContent className='pt-6'>
               <Form {...professionalForm}>
                  <form
                     onSubmit={professionalForm.handleSubmit(
                        onSubmitProfessional
                     )}
                     className='space-y-6'
                  >
                     <FormField
                        control={professionalForm.control}
                        name='bio'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Professional Bio</FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder='Share your professional experience and expertise...'
                                    className='min-h-[120px]'
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription>
                                 This bio will be visible on your public profile
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={professionalForm.control}
                        name='fees'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Consultation Fees</FormLabel>
                              <FormControl>
                                 <Input placeholder='2000.00' {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className='space-y-3'>
                        <FormLabel>Specializations</FormLabel>
                        <div className='mb-4 flex flex-wrap gap-2'>
                           {specialties.map((specialty, index) => (
                              <div
                                 key={index}
                                 className='flex items-center rounded-full bg-secondary px-3 py-1 text-secondary-foreground'
                              >
                                 <span className='mr-2'>{specialty}</span>
                                 <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='h-5 w-5'
                                    onClick={() =>
                                       handleRemoveSpecialty(specialty)
                                    }
                                 >
                                    <X className='h-3 w-3' />
                                 </Button>
                              </div>
                           ))}
                        </div>

                        <div className='flex gap-2'>
                           <Input
                              placeholder='Add a specialization'
                              value={newSpecialty}
                              onChange={(e) => setNewSpecialty(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddSpecialty();
                                 }
                              }}
                           />
                           <Button type='button' onClick={handleAddSpecialty}>
                              Add
                           </Button>
                        </div>
                     </div>

                     <Button type='submit' disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save Professional Info'}
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      );
   }

   if (activeTab === 'clinic') {
      return (
         <Card className='w-full'>
            <CardContent className='pt-6'>
               <Form {...clinicForm}>
                  <form
                     onSubmit={clinicForm.handleSubmit(onSubmitClinic)}
                     className='space-y-6'
                  >
                     <FormField
                        control={clinicForm.control}
                        name='clinicname'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Clinic Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='Your Clinic Name'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={clinicForm.control}
                        name='clinicaddress'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Clinic Address</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder='123 Medical Street'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={clinicForm.control}
                        name='clinicgovernate'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Governate/Region</FormLabel>
                              <FormControl>
                                 <Input placeholder='Cairo' {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button type='submit' disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save Clinic Info'}
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      );
   }

   return null;
};
