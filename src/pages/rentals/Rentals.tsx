import React, { useState, type FC } from 'react';
import {
  Button,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Portal,
  Stack,
  Table,
} from '@chakra-ui/react';
import { PiMagnifyingGlass, PiPlus, PiRows, PiSquaresFour } from 'react-icons/pi';
import { PageWrapper, TextInput } from '@/components';
import { Form, Formik } from 'formik';

export const Rentals: FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <PageWrapper full>
      <Stack w={'full'} h={'full'} px={'10'}>
        <SearchBar onAddNew={() => setDrawerOpened(true)} />
        <RentalsTable />
        <CreateNewDrawer
          open={drawerOpened}
          setOpen={setDrawerOpened}
          title={'Create New Rental'}
          renderContent={renderForm}
        />
      </Stack>
    </PageWrapper>
  );
};

const renderForm = () => {
  return (
    <Stack>
      <Formik
        onSubmit={() => {
          console.log('submitting...');
        }}
        initialValues={{
          name: '',
        }}
      >
        <Form>
          <TextInput label={'Name'} name={'name'} />
          <TextInput label={'Status'} name={'status'} />
          <TextInput label={'Stances'} name={'stances'} />
          <TextInput label={'Description'} name={'description'} />
          <TextInput label={'Address'} name={'address'} />
        </Form>
      </Formik>
    </Stack>
  );
};

const RentalsTable = () => {
  return (
    <Table.Root variant={'outline'} rounded={'xl'} mt={'10'}>
      <Table.Caption />
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
};

const SearchBar = ({ onAddNew }: { onAddNew: () => void }) => {
  const [tableMode, setTableMode] = useState<'grid' | 'list'>('list');
  return (
    <HStack w={'full'} alignItems={'center'} justifyContent={'center'} gap={'0'}>
      <HStack borderRight={'1px solid gray'} px={'5'} mr={'5'} w={'full'} justifyContent={'end'}>
        <IconButton
          colorPalette={'white'}
          variant={tableMode === 'list' ? 'solid' : 'outline'}
          onClick={() => setTableMode('list')}
        >
          <PiRows />
        </IconButton>
        <IconButton
          colorPalette={'white'}
          variant={tableMode === 'grid' ? 'solid' : 'outline'}
          onClick={() => setTableMode('grid')}
        >
          <PiSquaresFour />
        </IconButton>
      </HStack>

      <InputGroup minW={'500px'} startElement={<PiMagnifyingGlass />}>
        <Input placeholder={'Search...'} />
      </InputGroup>

      <HStack borderLeft={'1px solid gray'} px={'5'} ml={'5'} w={'full'} justifyContent={'start'}>
        <Button variant={tableMode === 'list' ? 'solid' : 'outline'} onClick={onAddNew}>
          Create New
          <PiPlus />
        </Button>
      </HStack>
    </HStack>
  );
};

const CreateNewDrawer = ({
  open,
  setOpen,
  title,
  renderContent,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  renderContent: () => React.ReactNode;
}) => {
  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size={'sm'}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding={'4'}>
          <Drawer.Content rounded={'lg'}>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{renderContent()}</Drawer.Body>
            <Drawer.Footer>
              <Button variant={'outline'}>Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size={'sm'} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
