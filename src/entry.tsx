import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { system, GlobalStyles } from '@/styles';
import { Home, Login } from '@/pages';
import { App, Dashboard } from '@/layouts';

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
          <Route path={'/'} element={<App />}>
            <Route path={'login'} element={<Login />} />
            <Route path={'/'} element={<Dashboard />}>
              <Route path={'/'} element={<Home />} />
            </Route>
            <Route path={'*'} element={<Text>404</Text>} />
          </Route>
        </Routes>
      </StrictMode>
    </ChakraProvider>
  </BrowserRouter>
);
