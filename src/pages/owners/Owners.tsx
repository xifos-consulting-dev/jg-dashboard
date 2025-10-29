import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  PiPencil,
} from 'react-icons/pi';
import { PageWrapper, TextInput } from '@/components';
import { Form, Formik } from 'formik';
import { API_BASE_URL, API_ROUTES } from '@/utills';

type Owner = {
  id?: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email?: string | null;
  phone?: string | null;
  identification: string;
  status: 'active' | 'inactive';
};

export const Owners = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [owners, setOwners] = useState<Owner[]>([]);
  // const [selectedOwner, setSelectedOwner] = useState<Owner | undefined>();
  const selectedOwnerRef = useRef<Owner>(undefined);

  const setSelectedOwner = useCallback((newSelectedOwner?: Owner) => {
    selectedOwnerRef.current = newSelectedOwner;
  }, []);

  const fetchOwners = async () => {
    const response = await fetch(`${API_BASE_URL}${API_ROUTES.OWNERS}/all`);
    const data = await response.json();
    console.log(data);
    setOwners(data);
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleSave = (values: Owner) => {
    // Replace if existing (edit), otherwise append (new)
    setOwners((prev) => {
      const existing = prev.find((o) => o.id === values.id);
      return existing ? prev.map((o) => (o.id === values.id ? values : o)) : [...prev, values];
    });

    setDrawerOpened(false);
    setSelectedOwner(undefined);
  };

  const handleEdit = (owner: Owner) => {
    setSelectedOwner(owner);
    setDrawerOpened(true);
  };

  return (
    <PageWrapper full>
      <Stack w={'full'} h={'full'} px={'10'}>
        <SearchBar onAddNew={() => setDrawerOpened(true)} />
        <RentalsTable owners={owners} onEdit={handleEdit} />
        <CreateNewDrawer
          open={drawerOpened}
          setOpen={setDrawerOpened}
          title={selectedOwnerRef.current ? 'Edit Owner' : 'Create New Owner'}
          onSave={handleSave}
          onCancel={() => setSelectedOwner(undefined)}
          owner={selectedOwnerRef.current}
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
  onCancel,
  owner,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onSave: (values: Owner) => void;
  onCancel: () => void;
  owner?: Owner;
}) => {
  const handleSave = async (values: Owner) => {
    const method = values.id ? 'PUT' : 'POST';
    const url = values.id
      ? `${API_BASE_URL}${API_ROUTES.OWNERS}/${values.id}`
      : `${API_BASE_URL}${API_ROUTES.OWNERS}`;

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    onSave(data);
  };

  const initialValues = useMemo(
    () =>
      owner ??
      ({
        identification: '',
        firstName: '',
        displayName: '',
        lastName: '',
        phone: '',
        email: '',
        status: 'inactive',
      } as Owner),
    [owner]
  );

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) onCancel();
  };

  return (
    <Portal>
      <Formik onSubmit={handleSave} initialValues={initialValues} enableReinitialize>
        {({ submitForm, isSubmitting }) => (
          <Drawer.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} size={'sm'}>
            <Drawer.Backdrop />
            <Drawer.Positioner padding={'4'}>
              <Drawer.Content rounded={'lg'}>
                <Drawer.Header>
                  <Drawer.Title>{title}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Form>
                    <Stack>
                      <TextInput label={'Identification'} name={'identification'} />
                      <TextInput label={'First Name'} name={'firstName'} />
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
                  <Button variant={'outline'} onClick={() => onOpenChange(false)}>
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

const RentalsTable = ({ owners, onEdit }: { owners: Owner[]; onEdit: (owner: Owner) => void }) => {
  const headers = ['ID', 'Name', 'Phone', 'Email', 'Actions'];
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
                <For
                  each={[
                    owner.identification,
                    owner.displayName,
                    owner.phone ?? '',
                    owner.email ?? '',
                  ]}
                >
                  {(value, index) => <Table.Cell key={index}>{value}</Table.Cell>}
                </For>

                {/* ✅ Add action column */}
                <Table.Cell>
                  <IconButton size={'sm'} onClick={() => onEdit(owner)}>
                    <PiPencil />
                  </IconButton>
                </Table.Cell>
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
