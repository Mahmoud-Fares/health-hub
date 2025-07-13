import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/error-boundary';

const MainLayout = lazy(() => import('@/app/layouts/main-layout'));
const ProtectedLayout = lazy(() => import('@/app/layouts/protected-layout'));
const AuthLayout = lazy(() => import('@/app/layouts/auth-layout'));

const LoginPage = lazy(() => import('@/app/pages/login'));
const SignUpPage = lazy(() => import('@/app/pages/signup'));

const Home = lazy(() => import('@/features/landing/pages/home-page'));
const Store = lazy(() => import('@/features/store/pages/store'));
const ProductsPage = lazy(() => import('@/features/store/pages/product-page'));
const ProductDetailPage = lazy(
   () => import('@/features/store/pages/product-details-page')
);
const CategoryPage = lazy(() => import('@/features/store/pages/category-page'));
const CartPage = lazy(() => import('@/features/store/pages/cart-page'));
const OrdersPage = lazy(() => import('@/features/store/pages/orders-page'));
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

const AboutPage = lazy(() => import('@/features/landing/pages/about-page'));
const ArticleDetailPage = lazy(
   () => import('@/features/landing/pages/article-detail-page')
);
const ArticlesPage = lazy(
   () => import('@/features/landing/pages/articles-page')
);
const CalculatorsPage = lazy(
   () => import('@/features/landing/pages/calculator-page')
);
const ContactUs = lazy(() => import('@/features/landing/pages/contact-us'));
const FoodScannerPage = lazy(
   () => import('@/features/landing/pages/food-scanner-page')
);
const ServicesPage = lazy(
   () => import('@/features/landing/pages/services-page')
);
const TestimonialsPage = lazy(
   () => import('@/features/landing/pages/testimonials-page')
);
const WorkoutVideosPage = lazy(
   () => import('@/features/landing/pages/workout-videos-page')
);

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
            path: 'articles',
            element: <ArticlesPage />,
         },
         {
            path: 'articles/:id',
            element: <ArticleDetailPage />,
         },
         {
            path: 'workout-videos',
            element: <WorkoutVideosPage />,
         },
         { path: 'about', element: <AboutPage /> },
         { path: 'services', element: <ServicesPage /> },
         { path: 'testimonials', element: <TestimonialsPage /> },
         { path: 'calculators', element: <CalculatorsPage /> },
         { path: 'food-scanner', element: <FoodScannerPage /> },
         { path: 'contact', element: <ContactUs /> },
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
         {
            path: '/store',
            children: [
               {
                  index: true,
                  element: <Store />,
               },
               {
                  path: 'products',
                  element: <ProductsPage />,
               },
               {
                  path: 'product/:pid',
                  element: <ProductDetailPage />,
               },
               {
                  path: 'category/:id',
                  element: <CategoryPage />,
               },
               {
                  path: 'cart',
                  element: <CartPage />,
               },
               {
                  path: 'orders',
                  element: <OrdersPage />,
               },
            ],
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
      ],
   },
]);
