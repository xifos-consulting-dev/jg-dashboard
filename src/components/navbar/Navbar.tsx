import { Button, Center, HStack } from '@chakra-ui/react';
import { PiAddressBook, PiFiles, PiHouse } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
// import logo from '../../assets/logo.jpg';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderNabarButtons = () => {
    return buttons.map(({ name, path, Icon }, index) => {
      const isActive = location.pathname === `${path}`;
      return (
        <Button
          key={index}
          colorPalette={isActive ? 'green' : 'black'}
          size={{ base: 'md', md: '2xl' }}
          variant={'plain'}
          onClick={() => navigate(path)}
        >
          {name}
          <Icon />
        </Button>
      );
    });
  };
  return (
    <>
      <HStack bgColor={'white'} w={'full'} h={'100px'}>
        <Center w={'full'} gap={{ base: '5', md: '10' }} px={10}>
          {renderNabarButtons()}
        </Center>
      </HStack>
    </>
  );
};

const buttons = [
  { name: 'Owners', path: '/app/owners', Icon: PiAddressBook },
  { name: 'Rentals', path: '/app/rentals', Icon: PiHouse },
  { name: 'Reports', path: '/app/reports', Icon: PiFiles },
];
