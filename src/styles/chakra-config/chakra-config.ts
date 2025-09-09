import { createSystem, defaultConfig } from '@chakra-ui/react';
import { defineAnimationStyles } from '@chakra-ui/react';

const animationStyles = defineAnimationStyles({
  fadeScaleOut: {
    value: {
      animationName: 'fadeScaleOut',
      animationDuration: '1s',
      animationFillMode: 'forwards',
      animationTimingFunction: 'ease-out',
    },
  },
  fadeIn: {
    value: {
      animationName: 'fadeIn',
      animationDuration: '0.3s',
      animationFillMode: 'forwards',
      animationTimingFunction: 'ease-in-out',
    },
  },
});

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Playfair Display',serif` },
        body: { value: `'Monserrat', sans-serif` },
      },
    },
    animationStyles,
  },
});
