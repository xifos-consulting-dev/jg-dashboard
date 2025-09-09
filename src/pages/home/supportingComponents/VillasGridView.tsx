import { Grid, Heading, Text } from '@chakra-ui/react';
import VillaCard from './VillaCard';
import villas from '../../../villas/mockData';
import { SectionWrapper } from '@/components';
export const VillasGridView = () => {
  return (
    <SectionWrapper>
      <Heading size={'6xl'} letterSpacing={'wider'} fontWeight={'extralight'}>
        Vacation Homes
      </Heading>
      <Text
        w={'full'}
        fontSize={'lg'}
        fontWeight={'light'}
        letterSpacing={'wider'}
        textAlign={'justify'}
      >
        Explore our collection of luxurious vacation homes, each offering unique amenities and
        breathtaking views. Whether you're looking for a cozy retreat or a spacious villa, we have
        the perfect place for your next getaway.
      </Text>
      <Grid
        w={'full'}
        h={'full'}
        maxW={'1500px'}
        alignItems={'stretch'}
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={'10'}
      >
        {villas.length > 0 && villas.map((villa, index) => <VillaCard key={index} villa={villa} />)}
      </Grid>
    </SectionWrapper>
  );
};
