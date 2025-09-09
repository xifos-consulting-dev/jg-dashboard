import type { Villa } from '@/villas/mockData';
import { Center, GridItem, Text, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type VillaCardProps = {
  villa: Villa;
};
const VillaCard = ({ villa }: VillaCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <GridItem w={'full'} h={'full'}>
      <Center
        w={'full'}
        h={'full'}
        position={'relative'}
        onClick={() => navigate('villas/' + villa.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        overflow={'hidden'}
        rounded={'lg'}
        bg={'black'}
      >
        <Image
          src={villa.banner}
          alt={villa.name}
          transition={'all .3s ease'}
          filter={'auto'}
          blur={isHovered ? '0.5px' : 'none'}
          w={'full'} // ✅ fill width
          h={{ base: '300px', md: 'full' }} // ✅ fill height
          minH={'300px'}
          maxH={'400px'}
          objectFit={'cover'} // ✅ keep aspect ratio
          style={{
            cursor: 'pointer',
            // backdropFilter:,
            opacity: isHovered ? 0.7 : 0.9,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <Text
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight={'light'}
          // fontFamily={'sans-serif'}
          color={'white'}
          textShadow={'0px 0px 15px rgba(0, 0, 0, 1)'}
          textAlign={'center'}
          w={'full'}
          transition={'all .3s ease'}
        >
          {villa.name.toUpperCase()}
        </Text>
      </Center>
    </GridItem>
  );
};

export default VillaCard;
