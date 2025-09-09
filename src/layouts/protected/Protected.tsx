import { useCookies } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const Protected = () => {
  const { getCookie } = useCookies();
  const authToken = getCookie('token');

  if (!authToken) return <Navigate to={'/login'} replace />;

  return <Outlet />;
};
