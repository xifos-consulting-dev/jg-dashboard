import { Center } from '@chakra-ui/react';
import { PageWrapper } from '@/components/pageWrapper/PagerWrapper';
import { Image } from '@chakra-ui/react';
import homeImage from '../../../src/assets/home_image.jpg';
import { Formik, Form, Field } from 'formik';
import { Button, VStack, Heading, Input, Textarea, Field as ChakraField } from '@chakra-ui/react';
import { SectionWrapper } from '@/components';

export const Contact = () => {
  return (
    <PageWrapper>
      <SectionWrapper keepBorder py={'0'} px={'0'}>
        <Center w={'full'} flexDirection={{ base: 'column', lg: 'row' }} gap={0}>
          <Center
            w={{ base: 'full', lg: '50%' }}
            h={{ base: '10%', lg: 'full' }}
            position={'relative'}
            overflow={'hidden'}
            bg={'black'}
            borderTopLeftRadius={'lg'}
            borderBottomLeftRadius={{ base: 'none', lg: 'lg' }}
            borderTopRightRadius={{ base: 'lg', lg: 'none' }}
          >
            <Image
              src={homeImage}
              flex={'1'}
              aspectRatio={{ base: 'wide', md: 'ultrawide', lg: 'square' }}
              w={'full'}
              objectFit={'cover'}
              alt={'Home Image'}
            />
          </Center>

          <Center flexDir={'column'} w={'full'} p={'10'} flex={'1'}>
            <Heading as={'h1'} size={'2xl'} fontFamily={'heading'} w={'full'} textAlign={'center'}>
              Get in Touch
            </Heading>
            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <VStack gap={4} mt={4} w={'300px'}>
                  <ChakraField.Root id={'name'}>
                    <ChakraField.Label>Name</ChakraField.Label>
                    <Field as={Input} name={'name'} placeholder={'Name'} />
                  </ChakraField.Root>

                  <ChakraField.Root id={'email'}>
                    <ChakraField.Label>Email</ChakraField.Label>
                    <Field as={Input} name={'email'} type={'email'} placeholder={'Email'} />
                  </ChakraField.Root>

                  <ChakraField.Root id={'message'}>
                    <ChakraField.Label>Message</ChakraField.Label>
                    <Field as={Textarea} name={'message'} placeholder={'Your message...'} />
                  </ChakraField.Root>

                  <Button
                    type={'submit'}
                    colorPalette={'green'}
                    variant={'solid'}
                    size={'lg'}
                    mt={4}
                  >
                    Submit
                  </Button>
                </VStack>
              </Form>
            </Formik>
          </Center>
        </Center>
      </SectionWrapper>
    </PageWrapper>
  );
};
