import { Text, Heading, Badge, Center, Button } from '@chakra-ui/react';
import { BookingForm, Carousel } from './supportingComponents';
import { PageWrapper, SectionWrapper } from '@/components';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
import { PiArrowSquareOutBold, PiBedFill, PiBathtubFill, PiUsersFill } from 'react-icons/pi';
import villas from '../../villas/mockData';

export const VillaBook = () => {
  const { id } = useParams() || '';
  const currentVilla = !id ? undefined : villas.find((villa) => villa?.id.toString() === id);

  return (
    <PageWrapper>
      <SectionWrapper>
        <Heading as={'h1'} size={'4xl'} mb={'5'}>
          {currentVilla?.name}
        </Heading>
        <Carousel currentVilla={currentVilla} />
        <Heading>
          <Center my={5} gap={{ base: '2', md: '10' }}>
            {currentVilla?.bedrooms && (
              <Badge
                size={'lg'}
                colorPalette={'green'}
                rounded={'full'}
                fontSize={'md'}
                py={'2'}
                px={'4'}
                gap={'2'}
              >
                <PiBedFill />
                Rooms - {currentVilla.bedrooms}
              </Badge>
            )}
            {currentVilla?.baths && (
              <Badge
                size={'lg'}
                colorPalette={'green'}
                rounded={'full'}
                fontSize={'md'}
                py={'2'}
                px={'4'}
                gap={'2'}
              >
                <PiBathtubFill />
                Baths - {currentVilla.baths}
              </Badge>
            )}
            {currentVilla?.sleeps && (
              <Badge
                size={'lg'}
                colorPalette={'green'}
                rounded={'full'}
                fontSize={'md'}
                py={'2'}
                px={'4'}
                gap={'2'}
              >
                <PiUsersFill />
                Sleeps - {currentVilla.sleeps}
              </Badge>
            )}
          </Center>
        </Heading>
        <Text
          width={{ base: 'full', md: '75%' }}
          fontSize={'lg'}
          fontWeight={'light'}
          textAlign={{ base: 'left', md: 'justify' }}
          dangerouslySetInnerHTML={{
            __html:
              currentVilla?.description ||
              'This luxurious villa offers stunning views and top-notch amenities, perfect for a relaxing getaway.',
          }}
        />
        {currentVilla?.externalLink && (
          <Button asChild>
            <a href={currentVilla.externalLink} target={'_blank'}>
              View more photos <PiArrowSquareOutBold />
            </a>
          </Button>
        )}
        <BookingForm />
      </SectionWrapper>
    </PageWrapper>
  );
};
