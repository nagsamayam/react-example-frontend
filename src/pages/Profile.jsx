import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../componets/Wrapper";


const Profile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [roleId, setRoleId] = useState('');

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                const rolesRes = await axios.get('roles');
                setRoles(rolesRes.data.data);

                const { data } = await axios.get(`user`);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setRoleId(data.roles[0].id)
            }
        )()
    },[])

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`user/profile`, {
            first_name: firstName,
            last_name: lastName,
            email,
            role_id: roleId,
        });

        navigate('/')
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`user/password`, {
            current_password: currentPassword,
            password,
            password_confirmation: passwordConfirm
        });

        navigate('/')
    }

    return (
        <Wrapper>
            <h3 className="mt-3">Account Information</h3>

            <form className="mt-3" onSubmit={handleProfileSubmit}>
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

                <button className="btn btn-outline-secondary">Save</button>
            </form>

            <h3 className="mt-4">Change Password</h3>

            <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
                    <label>Current Password</label>
                    <input type="password" className="form-control" placeholder="Current Password" 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="New Password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="New Password confirm" 
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>


        </Wrapper>
    )
}

export default Profile;