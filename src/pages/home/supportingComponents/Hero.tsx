import { Box, Center, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import bg from '../../../assets/home_image.jpg';

export const Hero = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const root = document.getElementById('root');
    if (!root) return;

    const scrollY = root.scrollTop;

    const fadeStart = 0;
    const fadeEnd = 300;

    const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);

    const scale = 1 - progress * 0.2;
    const height = 100 - progress * 100;

    if (animationRef.current) {
      animationRef.current.style.transform = `scale(${scale})`;
      if (height > 25) animationRef.current.style.height = `${height}vh`;
    }
  };

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    root.addEventListener('scroll', handleScroll, { passive: true });
    return () => root.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      ref={animationRef}
      w={'100%'}
      h={'100dvh'}
      bgImage={`url(${bg})`}
      bgSize={'cover'}
      backgroundPosition={'center'}
      bgRepeat={'no-repeat'}
      transition={'opacity 0.2s ease-out, transform 0.2s ease-out'}
      roundedBottom={'2xl'}
      marginBottom={'10'}
    >
      <Center w={'full'} h={'full'} flexGrow={1} flexDir={'column'} gap={5}>
        <Text
          fontSize={{ base: '3xl', md: '6xl' }}
          letterSpacing={'wide'}
          fontWeight={'light'}
          textShadow={'0 4px 8px rgba(0,0,0,0.6)'}
          color={'white'}
          textAlign={'center'}
          px={'10'}
        >
          Staying for a few weeks?
        </Text>
      </Center>
    </Box>
  );
};
