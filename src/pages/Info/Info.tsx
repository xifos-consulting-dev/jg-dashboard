import { Center, Heading, Text, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { PageWrapper } from '@/components/pageWrapper/PagerWrapper';
import { SectionWrapper } from '@/components';

const TourInfo = () => {
  return (
    <Dialog.Root size={'cover'} placement={'center'} motionPreset={'slide-in-bottom'}>
      <Dialog.Trigger asChild>
        <Button>Tour Information</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Tour Information</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size={'sm'} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <iframe
                src={'https://drive.google.com/file/d/1Cy0MTkc7M-zgrAOyu3E74QElbEYvWB7M/preview'}
                width={'100%'}
                height={'100%'}
                style={{ border: 'none' }}
              ></iframe>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export const Info = () => {
  return (
    <PageWrapper>
      <SectionWrapper keepBorder>
        <Center w={'full'} h={'full'} display={'flex'} flexDirection={'column'} gap={10}>
          <Heading size={'3xl'} font={'heading'}>
            Local Area Info
          </Heading>
          <Text textAlign={{ base: 'left', sm: 'center' }}>
            Here is a look at the many experiences you can enjoy in the local areas around
            Dominical.
            <br />
            <br />
            For more information on any of these or other tours, please get in touch with us.
          </Text>
          <Button onClick={() => (window.location.href = '/contact')}>Contact Us</Button>
          <TourInfo />
        </Center>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Info;
