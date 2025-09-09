import { useField } from 'formik';
import { Input, Text, Field as ChakraField } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';

export type TextInputType = {
  label: string;
} & InputProps;

export const TextInput = (props: TextInputType) => {
  const { name, required = false, label } = props;
  const [field, meta] = useField(name);
  const { error, touched } = meta;

  return (
    <ChakraField.Root gap={'1'} colorPalette={'green'} required={required}>
      <ChakraField.Label fontWeight={'bold'} fontFamily={'body'}>
        {label}
      </ChakraField.Label>
      <Input {...props} {...field} w={'full'} borderWidth={'thin'} borderColor={'gray.300'} />
      {error && touched && (
        <Text fontSize={'md'} color={'red.500'}>
          {error}
        </Text>
      )}
    </ChakraField.Root>
  );
};
