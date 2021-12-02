import axios from "axios";
import { useState } from "react"
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { UserLoginSchema } from "../validationSchemas/user.login.schema";
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {

    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formOptions = { resolver: yupResolver(UserLoginSchema) };

    const { register, handleSubmit, setError, formState } = useForm(formOptions);

    const { errors } = formState;

    const onSubmit = async(formData) => {
        setLoading(true);

        await axios.post('login', { email: formData.email, password: formData.password })
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            setLoading(false);
                const errResponse = error.response;               
                
                if(errResponse.status === 422) {
                    for (let [field, messages] of Object.entries(errResponse.data.errors)) {
                        setError(field, { type: 'server', message: messages[0] });
                    }
                }
        })

    }

    return(
        <>
            <main className="form-signin">
                <form onSubmit={handleSubmit(onSubmit)}>                      

                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            name="email"
                            type="text"
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            autoComplete="off   "
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>

                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    
                    

                    <div className="form-group mb-3">
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Submitting...' : 'Sigin'}
                        </button>
                        </div>
                </form>
            </main>
        </>
    )
}

export default Login