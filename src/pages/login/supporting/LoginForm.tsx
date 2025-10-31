import { TextInput } from '@/components';
import { useCookies } from '@/hooks';
import { Button, Center, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { getBackendClient } from '@/utills/backend/connectionHandler';

type LoginFormValues = {
  mail: string;
  pass: string;
};
const client = getBackendClient();

async function login(credentials: { email: string; password: string }) {
  try {
    const response = await client.post<{ token: string }>('/login', {
      body: credentials,
    });
    console.log('Login response:', response);
    if (!response.token) {
      throw new Error('No token received from server');
    }
    return response.token;
  } catch (error) {
    console.error('Login request failed:', error);
    throw error;
  }
}

export const LoginForm = () => {
  const { setCookie } = useCookies();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const token = await login({ email: values.mail, password: values.pass });
      console.log('Login successful, token:', token);

      setCookie('   token', token);
      navigate('/app');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
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
            <TextInput name={'pass'} label={'Password'} type={'password'} />
            <Button type={'submit'} colorScheme={'blue'} loading={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Center>
  );
};
