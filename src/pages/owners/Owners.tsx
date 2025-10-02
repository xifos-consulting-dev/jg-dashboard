import React, { useEffect, useState } from 'react';
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
  For,
  Pagination,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  PiArrowLeft,
  PiArrowRight,
  PiMagnifyingGlass,
  PiPlus,
  PiRows,
  PiSquaresFour,
} from 'react-icons/pi';
import { PageWrapper, TextInput } from '@/components';
import { Form, Formik } from 'formik';

type Owner = {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
};

export const Owners = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [owners, setOwners] = useState<Owner[]>([]);

  const fetchOwners = async () => {
    const response = await fetch('http://localhost:3000/api/owners/all');
    const data = await response.json();
    setOwners(data);
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const onSave = (values: Owner) => {
    setOwners([...owners, values]);
    setDrawerOpened(false); // Close drawer after saving
  };

  return (
    <PageWrapper full>
      <Stack w={'full'} h={'full'} px={'10'}>
        <SearchBar onAddNew={() => setDrawerOpened(true)} />
        <RentalsTable owners={owners} />
        <CreateNewDrawer
          open={drawerOpened}
          setOpen={setDrawerOpened}
          title={'Create New Owner'}
          onSave={onSave}
        />
      </Stack>
    </PageWrapper>
  );
};

const CreateNewDrawer = ({
  open,
  setOpen,
  title,
  onSave,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onSave: (values: Owner) => void;
}) => {
  const handleSave = async (values: Owner) => {
    console.log(values);
    // const response = await fetch('http://localhost:3000/api/owners', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // });
    // const data = await response.json();
    onSave(values);
  };

  return (
    <Portal>
      <Formik
        onSubmit={handleSave}
        initialValues={{
          id: '',
          name: '',
          lastName: '',
          phone: '',
          email: '',
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size={'sm'}>
            <Drawer.Backdrop />
            <Drawer.Positioner padding={'4'}>
              <Drawer.Content rounded={'lg'}>
                <Drawer.Header>
                  <Drawer.Title>{title}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Form>
                    <Stack>
                      <TextInput label={'ID'} name={'id'} />
                      <TextInput label={'Name'} name={'name'} />
                      <TextInput label={'Last Name'} name={'lastName'} />
                      <TextInput label={'Phone'} name={'phone'} />
                      <TextInput label={'Email'} name={'email'} />
                    </Stack>
                  </Form>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size={'sm'} />
                </Drawer.CloseTrigger>
                <Drawer.Footer>
                  <Button variant={'outline'} onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={submitForm} loading={isSubmitting} loadingText={'Saving...'}>
                    Save
                  </Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        )}
      </Formik>
    </Portal>
  );
};

const RentalsTable = ({ owners }: { owners: Owner[] }) => {
  const headers = ['ID', 'Name', 'Last Name', 'Phone', 'Email'];
  return (
    <Stack alignItems={'end'}>
      <Table.Root variant={'outline'} rounded={'xl'} mt={'10'}>
        <Table.Header>
          <Table.Row>
            <For each={headers}>
              {(heading, index) => <Table.ColumnHeader key={index}>{heading}</Table.ColumnHeader>}
            </For>
            <Table.ColumnHeader />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <For each={owners}>
            {(owner, index) => (
              <Table.Row key={index}>
                <For each={Object.values(owner)}>
                  {(value, index) => <Table.Cell key={index}>{value}</Table.Cell>}
                </For>
                <Table.Cell />
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
      <Pagination.Root count={owners?.length * 5} pageSize={5} page={1}>
        <ButtonGroup variant={'ghost'} size={'sm'} wrap={'wrap'}>
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <PiArrowLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <PiArrowRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
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
        <Button variant={'solid'} onClick={onAddNew}>
          Create New
          <PiPlus />
        </Button>
      </HStack>
    </HStack>
  );
};
