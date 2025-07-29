import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  bio: yup
    .string()
    .optional()
    .max(200, 'Bio must be less than 200 characters'),
  birthday: yup
    .date()
    .optional()
    .max(new Date(), 'Birthday cannot be in the future'),
});