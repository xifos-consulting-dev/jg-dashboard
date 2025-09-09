// import { Footer, Navbar } from '@/components';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
