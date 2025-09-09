import { Box, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import type { Villa } from '@/villas/mockData';

const bucketURL =
  'https://storage.googleapis.com/jg-company-a9724.firebasestorage.app/JG-Imagenes/';

type CarouselProps = {
  currentVilla?: Villa;
};
export const Carousel = (props: CarouselProps) => {
  const { currentVilla } = props;
  const baseUrl = `${bucketURL}${currentVilla?.id}`;

  console.log(baseUrl);
  return (
    <Box w={{ base: '100%', lg: '90%' }}>
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        effect={'fade'}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
      >
        {currentVilla?.images?.map((image, index) => {
          return (
            <SwiperSlide key={`${index}-${image}`}>
              <Box w={'100%'} aspectRatio={'16/9'} overflow={'hidden'} rounded={'lg'}>
                <Image
                  src={`${baseUrl}/${image}`}
                  alt={image.toString()}
                  w={'100%'}
                  h={'100%'}
                  objectFit={'cover'}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};
