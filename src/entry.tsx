import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { system, GlobalStyles } from '@/styles';
import { Home, Login } from '@/pages';
import { Protected, Dashboard, Public } from '@/layouts';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/pages/villaInformation/supportingComponents/carousel/carousel.css';

const root = document.getElementById('root');

createRoot(root!).render(
  <BrowserRouter>
    <ChakraProvider value={system}>
      <StrictMode>
        {/* initialize custom styles */}
        <GlobalStyles />
        {/* app routing architecture */}
        <Routes>
          <Route element={<Public />}>
            <Route path={'/'} element={<Navigate to={'/login'} replace />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'*'} element={<Text>404</Text>} />
          </Route>
          <Route element={<Protected />}>
            {/* <Route path={'/'} element={<Navigate to={'/app'} replace />} /> */}
            <Route path={'/app'} element={<Dashboard />}>
              <Route path={''} element={<Home />} />
              <Route path={'*'} element={<Text>404</Text>} />
            </Route>
          </Route>
          <Route path={'*'} element={<Text>404</Text>} />
        </Routes>
      </StrictMode>
    </ChakraProvider>
  </BrowserRouter>
);
