import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../componets/Wrapper";

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [roleId, setRoleId] = useState('');

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('roles');
                setRoles(data.data);
            }
        )()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

       await axios.post('users', {
           first_name: firstName,
           last_name: lastName,
           email,
           password,
           password_confirmation: passwordConfirmation,
           role_id: roleId,
       })
       navigate('/users')
    }

    return (
        <Wrapper>
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={(e) => setRoleId(e.target.value)}>
                    <option value={''}>Select role</option>
                        {roles.map((role) => {
                            return (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            )
                        } )}
                    </select>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default CreateUser;