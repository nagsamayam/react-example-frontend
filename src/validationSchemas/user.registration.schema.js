import * as Yup from 'yup';

export const UserRegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
                .required('Enter first name')
                .min(3, 'Use 3 characters are more for your first name '),
    lastName: Yup.string().required('Enter last name'),
    email: Yup.string()
                .required('Enter Email')
                .email('Enter valid email'),
    password: Yup.string()
                .required('Enter a password')
                .min(8, 'Use 8 characters or more for your password')
                .max(30, 'Your password should between 6 and 30 characters'),
    passwordConfirmation: Yup.string()
                .required('You need to confirm your password')
                .oneOf([Yup.ref('password'), null], 'Both password should match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});