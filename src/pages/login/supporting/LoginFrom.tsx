import { TextInput } from '@/components';
import { useCookies } from '@/hooks';
import { Button, Center, Text } from '@chakra-ui/react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  mail: string;
  pass: string;
};

export const LoginForm = () => {
  const { setCookie } = useCookies();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    console.log('Submitting:', values);

    // Simulate async login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fake validation
    const errors: Partial<LoginFormValues> = {};
    if (values.mail !== 'demo@mail.com') errors.mail = 'Invalid email';
    if (values.pass !== 'password123') errors.pass = 'Incorrect password';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Success: set mock token and navigate
    setCookie('token', 'mock-token', 1);
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
