import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../componets/Wrapper";


const UpdateUser = () => {
    const params = useParams();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                const rolesRes = await axios.get('roles');
                setRoles(rolesRes.data.data);

                const { data } = await axios.get(`users/${params.id}`);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setRoleId(data.roles[0].id)
            }
        )()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`users/${params.id}`, {
            first_name: firstName,
            last_name: lastName,
            email,
            role_id: roleId,
        });

        navigate('/users')
    }

    return (
        <Wrapper>
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" 
                        defaultValue={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control"
                        defaultValue={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="text" className="form-control"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" value={roleId} onChange={(e) => setRoleId(e.target.value)}>
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

export default UpdateUser;