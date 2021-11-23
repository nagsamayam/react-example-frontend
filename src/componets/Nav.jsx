import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Nav = () => {

    const [user, setUser] = useState({
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('user');
                setUser(data);
            }
        )()
    },[])

    const logout = async () => {
        await axios.post('logout');
    }

    return(
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-log-2 mr-0 px-3" href="#">
                Company Name                
            </a>
            <ul className="my-2 my-md-0 mr-md-3">
                <Link to="/" className="p-2 text-white text-decoration-none">
                    {user.first_name + ' ' + user.last_name}
                </Link>
                <Link to={'/login'} className="p-2 text-white" onClick={logout}>Signout</Link>
            </ul>
        </nav>
    )
}

export default Nav