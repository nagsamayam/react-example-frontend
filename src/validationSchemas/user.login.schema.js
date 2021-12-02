import * as Yup from 'yup';

export const UserLoginSchema = Yup.object().shape({
    email: Yup.string()
                .required('Enter Email')
                .email('Enter valid email'),
    password: Yup.string().required('Enter password'),
})