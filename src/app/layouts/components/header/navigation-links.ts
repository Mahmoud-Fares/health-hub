export const navigationLinks = [
   {
      to: '/',
      label: 'Home',
      showAlways: true,
   },
   {
      to: '/find-doctors',
      label: 'Find Doctors',
      showAlways: true,
   },
   {
      to: '/my-appointments',
      label: 'My Appointments',
      showAlways: false,
   },
   {
      to: '/store',
      label: 'Store',
      showAlways: false,
   },
] as const;
