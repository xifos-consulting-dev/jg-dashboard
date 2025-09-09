import { TextInput } from '@/components';
import { useCookies } from '@/hooks';
import { Button, Center, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  mail: string;
  pass: string;
};

export const LoginForm = () => {
  const { setCookie } = useCookies();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    console.log('Submitting:', values);

    // Mock async login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Set a mock auth token
    setCookie('token', 'mock-token', 0.000694);
    navigate('/app');
  };

  return (
    <Center
      w={'fit-content'}
      px={'10'}
      py={'10'}
      gap={'10'}
      justifyContent={'center'}
      rounded={'2xl'}
      border={'gray.300'}
      borderWidth={'thin'}
      flexDirection={'column'}
    >
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        Login
      </Text>

      <Formik<LoginFormValues> initialValues={{ mail: '', pass: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form
            style={{
              width: '300px',
              gap: '15px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextInput name={'mail'} label={'Mail'} />
            <TextInput name={'pass'} label={'Password'} />
            <Button type={'submit'} colorScheme={'blue'} loading={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Center>
  );
};
