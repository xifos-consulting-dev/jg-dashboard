import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const App = () => {
  useEffect(() => {}, []);

  return <Outlet />;
};
