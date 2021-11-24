import axios from "axios"
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

const Nav = (props) => {

    const logout = async () => {
        await axios.post('logout');
    }

    return(
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-log-2 mr-0 px-3" href="#">
                Company Name                
            </a>
            <ul className="my-2 my-md-0 mr-md-3">
                <Link to="/profile" className="p-2 text-white text-decoration-none">
                    {props.firstName + ' ' + props.lastName}
                </Link>
                <Link to={'/login'} className="p-2 text-white" onClick={logout}>Signout</Link>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email
    }
}

export default connect(mapStateToProps)(Nav)