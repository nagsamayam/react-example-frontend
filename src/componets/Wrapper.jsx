import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Nav from "./Nav";
import {connect} from 'react-redux'
import { setUser } from "../redux/user/actions/setUserAction";

const Wrapper = (props) => {
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('user');
                    props.setUser({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        roleId: data.roles[0].id
                    })

                } catch(e) {
                    setRedirect(true)
                }
            }
        )()
    },[])

    if(redirect) {
        navigate('/login')
    }

    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {props.children}
                </main>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        firstName: state.first_name,
        lastName: state.last_name,
        email: state.email,
        roleId: state.roleId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch(setUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);