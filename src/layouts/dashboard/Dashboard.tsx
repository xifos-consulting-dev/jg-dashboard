// import { Footer, Navbar } from '@/components';
import { Navbar } from '@/components';
import { Outlet, useLocation } from 'react-router-dom';

export const Dashboard = () => {
  const location = useLocation();
  const isHome = location.pathname === '/app';
  return (
    <>
      {!isHome && <Navbar />}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
