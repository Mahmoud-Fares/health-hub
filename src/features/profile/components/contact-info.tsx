import { Mail } from 'lucide-react';

interface ContactInfoProps {
   email: string;
   phone?: string;
}

const ContactInfo = ({ email, phone }: ContactInfoProps) => {
   return (
      <div>
         <h3 className='mb-3 flex items-center font-medium'>
            <Mail className='mr-2 h-5 w-5 text-primary' />
            Contact Information
         </h3>
         <div className='grid grid-cols-2 gap-3 text-sm'>
            <p className='text-muted-foreground'>Email:</p>
            <p>{email}</p>
            <p className='text-muted-foreground'>Phone:</p>
            <p>{phone || 'Not specified'}</p>
         </div>
      </div>
   );
};

export default ContactInfo;
