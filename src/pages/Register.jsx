import axios from 'axios';
import { useState } from 'react';
import '../Login.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://api.antoniopapa-laravel-admin.test/api/register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirmation: passwordConfirm,
            role_id: 4
        });

        console.log(response.data);
    }

    return(
        <>
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    
                        <input type="text" className="form-control" placeholder="First Name" 
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input type="text" className="form-control" placeholder="Last Name" 
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input type="email" className="form-control" placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                        />                        
                        <input type="password" className="form-control" placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input type="password" className="form-control" placeholder="Password confirm" 
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />                        

                    <button type="submit" className="w-100 btn btn-lg btn-primary" >Sign in</button>
                </form>
            </main>
        </>
    )
}

export default Register;