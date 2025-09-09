import { useCookies } from '@/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const Public = () => {
  const { getCookie } = useCookies();
  const authToken = getCookie('token');
  const location = useLocation();

  // Only redirect if at "/" or "/login"
  if (authToken && (location.pathname === '/' || location.pathname === '/login')) {
    return <Navigate to={'/app'} replace />;
  }

  return <Outlet />;
};
