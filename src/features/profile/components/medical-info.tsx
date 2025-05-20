import { Patient } from '@/shared/types';

type MedicalInfoProps = {
   user: Patient;
};

const MedicalInfo = ({ user }: MedicalInfoProps) => {
   return (
      <div className='space-y-6'>
         <div>
            <h3 className='mb-3 font-medium'>Medical History</h3>
            <div className='rounded-md border bg-card p-3'>
               <p className='text-sm'>
                  {user.medical_history || 'No medical history recorded'}
               </p>
            </div>
         </div>

         <div>
            <h3 className='mb-3 font-medium'>Notes</h3>
            <div className='rounded-md border bg-card p-3'>
               <p className='text-sm'>{user.notes || 'No notes recorded'}</p>
            </div>
         </div>
      </div>
   );
};

export default MedicalInfo;
