import { PageWrapper } from '@/components';
import { Center, Image, Stack } from '@chakra-ui/react';
// import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';
import { LoginForm } from './supporting/LoginFrom';

export const Login = () => {
  return (
    <PageWrapper full>
      <Center w={'full'} h={'full'} flex={'1'}>
        <Image h={'150px'} src={logoLight} alt={'Logo'} />
      </Center>
      <Stack w={'full'} h={'full'} flex={'1'} alignItems={'center'}>
        <LoginForm />
      </Stack>
    </PageWrapper>
  );
};
