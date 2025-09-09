import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={{
      'html, body, #root': {
        height: '100%',
        color: '#3C3C3A',
        margin: '0',
        padding: '0',
        overflow: 'auto' /* important don't change auto base code depends on it */,
      },
      '@keyframes fadeScaleOut': {
        '0%': {
          opacity: 1,
          transform: 'scale(1)',
        },
        '100%': {
          opacity: 0,
          transform: 'scale(0.8)',
        },
      },
      '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }}
  />
);

export default GlobalStyles;
