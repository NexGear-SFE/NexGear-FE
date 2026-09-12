import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/Home/HomePage';
import { TechStaffLayout } from '@/layouts/TechStaffLayout';
import { TechStaffDashboard } from '@/pages/TechStaff/Dashboard';
import { SerialCheck } from '@/pages/TechStaff/SerialCheck';
import { Settings } from '@/pages/TechStaff/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/tech-staff',
    element: <TechStaffLayout />,
    children: [
      {
        index: true,
        element: <TechStaffDashboard />,
      },
      {
        path: 'serial',
        element: <SerialCheck />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);
