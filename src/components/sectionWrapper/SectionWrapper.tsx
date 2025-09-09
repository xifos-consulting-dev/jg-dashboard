import { Center } from '@chakra-ui/react';
import type { CenterProps } from '@chakra-ui/react';
type SectionWrapperProps = {
  keepBorder?: boolean;
} & Omit<CenterProps, 'keepBorder'>;

export const SectionWrapper = ({
  children,
  keepBorder = false,
  ...propsOverride
}: SectionWrapperProps) => {
  return (
    <Center
      w={{ base: keepBorder ? '90%' : '100%', md: '800px', lg: '1000px', xl: '1200px' }}
      flexDir={'column'}
      gap={'10'}
      my={{ base: 'none', lg: '24' }}
      shadow={keepBorder ? 'xl' : { base: 'none', lg: 'xl' }}
      py={'10'}
      px={{ base: '10', lg: '20', xl: '32' }}
      rounded={'lg'}
      {...propsOverride}
    >
      {children}
    </Center>
  );
};
