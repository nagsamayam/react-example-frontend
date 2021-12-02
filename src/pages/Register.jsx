import axios from 'axios';
import '../Login.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom"
import {UserRegistrationSchema} from '../validationSchemas/user.registration.schema'
import { useState } from 'react';
import { ValidationMessage } from '../componets/validation-message';

const Register = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();   

    const formOptions = { resolver: yupResolver(UserRegistrationSchema) };

    const { register, handleSubmit, setError, formState } = useForm(formOptions);

    const { errors } = formState;

    const onSubmit =  async (formData) => {  
            setLoading(true);

            await axios.post('register', {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.passwordConfirmation,
                role_id: 4
            }).then((response) => {
                navigate("/login"); 
            }).catch((error) => {
                setLoading(false);
                const errResponse = error.response;               
                
                if(errResponse.status === 422) {
                    for (let [field, messages] of Object.entries(errResponse.data.errors)) {
                        setError(field, { type: 'server', message: messages[0] });
                    }
                }
            });
    }

    return(
        <>  
            <main className="form-signin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-3">
                        <label>First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            {...register('firstName')}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        />
                        <ValidationMessage field={errors.firstName} />
                    </div>

                    <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            {...register('lastName')}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        />
                        <ValidationMessage field={errors.lastName} />
                    </div>

                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            name="email"
                            type="text"
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <ValidationMessage field={errors.email} />
                    </div>

                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <ValidationMessage field={errors.password} />                        
                    </div>
                    
                    <div className="form-group mb-3">
                        <label>Confirm Password</label>
                        <input
                            name="passwordConfirmation"
                            type="password"
                            {...register('passwordConfirmation')}
                            className={`form-control ${
                            errors.passwordConfirmation ? 'is-invalid' : ''
                            }`}
                        />
                        <ValidationMessage field={errors.passwordConfirmation} />
                    </div>

                    <div className="form-group form-check mb-3">
                        <input
                            name="acceptTerms"
                            type="checkbox"
                            {...register('acceptTerms')}
                            className={`form-check-input ${
                            errors.acceptTerms ? 'is-invalid' : ''
                            }`}
                        />
                        <label htmlFor="acceptTerms" className="form-check-label">
                            I have read and agree to the Terms
                        </label>
                        <ValidationMessage field={errors.acceptTerms} />
                    </div>

                    <div className="form-group mb-3">
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Submitting...' : 'Register'}
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Register;