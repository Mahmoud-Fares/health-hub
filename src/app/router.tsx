import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/error-boundary';

const MainLayout = lazy(() => import('@/app/layouts/main-layout'));
const ProtectedLayout = lazy(() => import('@/app/layouts/protected-layout'));
const AuthLayout = lazy(() => import('@/app/layouts/auth-layout'));

const LoginPage = lazy(() => import('@/app/pages/login'));
const SignUpPage = lazy(() => import('@/app/pages/signup'));
const CallbackPage = lazy(() => import('@/app/pages/callback-page'));
const CompleteRegisterPage = lazy(
   () => import('@/app/pages/complete-register-page')
);
const VerifyAccountPage = lazy(() => import('@/app/pages/verify-account-page'));
const ForgotPasswordPage = lazy(() => import('@/app/pages/forgot-password'));

const Home = lazy(() => import('@/app/pages/home'));
const ClientProfilePage = lazy(() => import('@/app/pages/client-profile-page'));
const DoctorProfilePage = lazy(() => import('@/app/pages/doctor-profile-page'));
const SettingsPage = lazy(() => import('@/app/pages/settings'));
const FindDoctorsPage = lazy(() => import('@/app/pages/find-doctors'));
const BookAppointmentPage = lazy(() => import('@/app/pages/book-appointment'));
const PaymentPage = lazy(() => import('@/app/pages/payment-page'));
const DoctorSchedulePage = lazy(
   () => import('@/app/pages/doctor-schedule-page')
);
const MyAppointmentsPage = lazy(
   () => import('@/app/pages/my-appointments-page')
);
const AppointmentBookingsPage = lazy(
   () => import('@/app/pages/appointment-bookings-page')
);

const NotFound = lazy(() => import('@/app/pages/not-found'));

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: 'complete/register',
            element: <CompleteRegisterPage />,
         },
         {
            path: '/api/auth/google/callback',
            element: <CallbackPage />,
         },
         {
            path: 'verify-account',
            element: <VerifyAccountPage />,
         },
         {
            path: '*',
            element: <NotFound />,
         },
      ],
   },
   // Protected routes group
   {
      path: '/',
      element: <ProtectedLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: '/find-doctors',
            element: <FindDoctorsPage />,
         },
      ],
   },
   {
      path: '/',
      element: <ProtectedLayout withSidebar />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: '/doctor/:slug',
            element: <DoctorProfilePage />,
         },
         {
            path: '/client/:slug',
            element: <ClientProfilePage />,
         },
         {
            path: '/settings',
            element: <SettingsPage />,
         },
         {
            path: '/book-appointment/:slug',
            element: <BookAppointmentPage />,
         },
         {
            path: '/payment/:bookingId',
            element: <PaymentPage />,
         },
         {
            path: '/doctor/schedule',
            element: <DoctorSchedulePage />,
         },
         {
            path: '/my-appointments',
            element: <MyAppointmentsPage />,
         },
         {
            path: '/appointment-bookings/:appointmentId/:date',
            element: <AppointmentBookingsPage />,
         },
      ],
   },

   // Auth routes group
   {
      path: '/',
      element: <AuthLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: 'signup',
            element: <SignUpPage />,
         },
         {
            path: 'login',
            element: <LoginPage />,
         },
         {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
         },
      ],
   },
]);
