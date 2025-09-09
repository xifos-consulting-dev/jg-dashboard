import { Text, Heading } from '@chakra-ui/react';
import { PageWrapper } from '@/components/pageWrapper/PagerWrapper';
import { Image } from '@chakra-ui/react';
import homeImage from '../../../src/assets/home_image.jpg';
import { SectionWrapper } from '@/components';

export const About = () => {
  return (
    <PageWrapper>
      <SectionWrapper px={'0'} keepBorder>
        <Heading as={'h1'} size={'2xl'} my={5}>
          About Us
        </Heading>
        <Image src={homeImage} h={'30vh'} w={'100%'} alt={'Home'} />
        <Text lineClamp={'5'} w={{ base: '90%', lg: '75%' }} fontSize={'lg'} textAlign={'left'}>
          JOSUE GAMBOA - OWNER & PROPERTY MANAGER
        </Text>
        <Text
          w={{ base: '90%', lg: '75%' }}
          fontSize={'md'}
          fontWeight={'light'}
          letterSpacing={'wider'}
          textAlign={{ base: 'left', lg: 'justify' }}
        >
          Josue began working in property management with high-end luxury rentals and clientele. He
          teamed up with Coldwell Banker to expand his expertise in real-estate and has been heavily
          recruited by a number of top-notch property management groups in the area. Josue has
          worked in the tourism industry and specifically in Dominical for over 17 years.
          <br />
          <br />
          His experience in property management spans the gamut, from working with property owners
          to identify management needs and improvements to their real-estate investments to
          providing complete customer service to high-end clientele and all guests of our villas.
        </Text>
      </SectionWrapper>
    </PageWrapper>
  );
};
