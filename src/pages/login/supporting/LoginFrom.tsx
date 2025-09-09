import { TextInput } from '@/components';
import { Center, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

type LoginFormValues = {
  mail: string;
  pass: string;
};

export const LoginForm = () => {
  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
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
      justifyItems={'start'}
    >
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        Login
      </Text>
      <Formik<LoginFormValues>
        initialValues={{
          mail: '',
          pass: '',
        }}
        onSubmit={handleSubmit}
      >
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
        </Form>
      </Formik>
    </Center>
  );
};
