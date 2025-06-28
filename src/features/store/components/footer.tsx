const Footer = () => {
   return (
      <footer className='bg-gray-100 py-6'>
         <div className='container mx-auto px-4 text-center text-sm text-gray-500'>
            <p>
               &copy; {new Date().getFullYear()} HealthUp. All rights reserved.
            </p>
         </div>
      </footer>
   );
};

export default Footer;
