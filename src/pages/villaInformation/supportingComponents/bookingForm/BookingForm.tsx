import { Formik, Form, Field } from 'formik';
import {
  Text,
  Button,
  VStack,
  Heading,
  Input,
  Textarea,
  Field as ChakraField,
  Flex,
} from '@chakra-ui/react';

import BookSchema from './validation';

export const BookingForm = () => {
  return (
    <Formik
      width={'100%'}
      initialValues={{
        name: '',
        email: '',
        checkInDate: new Date().toLocaleDateString(),
        checkOutDate: '',
        numberOfGuests: '',
        otherDetails: '',
      }}
      validationSchema={BookSchema}
      onSubmit={(values, actions) => {
        // Handle form submission here
        console.log('Form submitted:', values);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form
          style={{
            width: '100%',
            maxWidth: '500px',
            minWidth: '300px',
          }}
        >
          <VStack px={'5'} w={'full'}>
            <Heading as={'h1'} size={'xl'} textAlign={'center'} mb={6} fontFamily={'heading'}>
              Check Availability
            </Heading>
            <VStack gap={'5'} px={'5'} w={'full'}>
              <ChakraField.Root colorPalette={'green'} id={'name'} required>
                <ChakraField.Label>Name</ChakraField.Label>
                <Field as={Input} name={'name'} placeholder={'Name'} />
                {errors.name && touched.name && (
                  <Text fontSize={'sm'} color={'red.500'}>
                    {errors.name}
                  </Text>
                )}
              </ChakraField.Root>

              <ChakraField.Root colorPalette={'green'} id={'email'} required>
                <ChakraField.Label>Email</ChakraField.Label>
                <Field as={Input} name={'email'} type={'email'} placeholder={'Email'} />
                {errors.email && touched.email && (
                  <Text fontSize={'sm'} color={'red.500'}>
                    {errors.email}
                  </Text>
                )}
              </ChakraField.Root>
              <Flex w={'full'} flexDirection={{ base: 'column', md: 'row' }} gap={'5'}>
                <ChakraField.Root id={'checkInDate'} colorPalette={'green'} required>
                  <ChakraField.Label>Check In Date</ChakraField.Label>
                  <Field
                    as={Input}
                    name={'checkInDate'}
                    type={'date'}
                    placeholder={'Check In Date'}
                  />
                  {errors.checkInDate && touched.checkInDate && (
                    <Text fontSize={'sm'} color={'red.500'}>
                      {errors.checkInDate}
                    </Text>
                  )}
                </ChakraField.Root>

                <ChakraField.Root colorPalette={'green'} required id={'checkOutDate'}>
                  <ChakraField.Label>Check Out Date</ChakraField.Label>
                  <Field
                    as={Input}
                    name={'checkOutDate'}
                    type={'date'}
                    placeholder={'Check Out Date'}
                  />
                  {errors.checkOutDate && touched.checkOutDate && (
                    <Text fontSize={'sm'} color={'red.500'}>
                      {errors.checkOutDate}
                    </Text>
                  )}
                </ChakraField.Root>
              </Flex>

              <ChakraField.Root colorPalette={'green'} required id={'numberOfGuests'}>
                <ChakraField.Label>Guests</ChakraField.Label>
                <Field
                  as={Input}
                  name={'numberOfGuests'}
                  type={'number'}
                  placeholder={'1, 2, 3...'}
                />
                {errors.numberOfGuests && touched.numberOfGuests && (
                  <Text fontSize={'sm'} color={'red.500'}>
                    {errors.numberOfGuests}
                  </Text>
                )}
              </ChakraField.Root>

              <ChakraField.Root colorPalette={'green'} required id={'otherDetails'}>
                <ChakraField.Label>Other Details</ChakraField.Label>
                <Field as={Textarea} name={'otherDetails'} placeholder={'Other Details'} />
                {errors.otherDetails && touched.otherDetails && (
                  <Text fontSize={'sm'} color={'red.500'}>
                    {errors.otherDetails}
                  </Text>
                )}
              </ChakraField.Root>

              <Button colorScheme={'blue'} size={'lg'} width={'50%'} type={'submit'}>
                Submit
              </Button>
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};
