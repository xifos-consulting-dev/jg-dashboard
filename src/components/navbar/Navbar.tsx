import { Button, Center, HStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
// import logo from '../../assets/logo.jpg';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderNabarButtons = () => {
    return views.map((view, index) => {
      const isActive = location.pathname === `/${view.path}`;
      return (
        <Button
          key={index}
          colorPalette={isActive ? 'green' : 'black'}
          size={{ base: 'md', md: '2xl' }}
          variant={'plain'}
          onClick={() => navigate(view.path)}
        >
          {view.name}
        </Button>
      );
    });
  };
  return (
    <>
      <Center w={'full'}>{/* <Image h={'200px'} src={logo} alt={'Logo'} /> */}</Center>
      <HStack bgColor={'white'} w={'full'} position={'sticky'} top={'0'} zIndex={'sticky'}>
        <Center w={'full'} gap={{ base: '5', md: '10' }} px={10}>
          {renderNabarButtons()}
        </Center>
      </HStack>
    </>
  );
};

const views = [
  { name: 'Home', path: '' },
  { name: 'About', path: 'about' },
  { name: 'Info', path: 'info' },
  { name: 'Contact', path: 'contact' },
];
