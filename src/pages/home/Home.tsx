import { PageWrapper } from '@/components';
import { Button, Center, HStack, Image, Text, VStack } from '@chakra-ui/react';
import logoLight from '../../assets/logo-light.svg';
import { PiAddressBook, PiFiles, PiHouse } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper full>
      <Center w={'full'} h={'full'} flexDirection={'column'} justifyContent={'space-evenly'}>
        <Image h={'150px'} src={logoLight} alt={'Logo'} />
        <VStack gap={'20'}>
          <Text fontSize={'5xl'}>Welcome</Text>
          <HStack gap={'20'}>
            <Button onClick={() => navigate('/app/owners')}>
              Owners
              <PiAddressBook />
            </Button>
            <Button onClick={() => navigate('/app/rentals')}>
              Rentals
              <PiHouse />
            </Button>
            <Button onClick={() => navigate('/app/reports')}>
              Reports
              <PiFiles />
            </Button>
          </HStack>
        </VStack>
      </Center>
    </PageWrapper>
  );
};
