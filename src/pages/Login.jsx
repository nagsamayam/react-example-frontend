import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        await axios.post('login', { email, password })

        navigate('/');        
    }

    return(
        <>
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>                    
                       
                        <input type="email" className="form-control" placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                        />                        
                        <input type="password" className="form-control" placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    <button type="submit" className="w-100 btn btn-lg btn-primary" >Sign in</button>
                </form>
            </main>
        </>
    )
}

export default Login