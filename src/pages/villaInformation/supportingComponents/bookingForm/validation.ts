import * as Yup from 'yup';

const BookSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  checkInDate: Yup.date()
    .required('Required')
    .min(new Date(), 'Check-in date must be today or later'),
  checkOutDate: Yup.date()
    .required('Required')
    .min(Yup.ref('checkInDate'), 'Check-out date must be after check-in'),
  numberOfGuests: Yup.number().min(1, 'Number of guests must be at least 1').required('Required'),
  otherDetails: Yup.string(),
});

export default BookSchema;
