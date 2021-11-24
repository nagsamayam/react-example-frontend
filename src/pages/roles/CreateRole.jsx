import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development"
import Wrapper from "../../componets/Wrapper"

const CreateRole = () => {
    const [permissions, setPermissions] = useState([]);
    const [permissionIds, setPermissionIds] = useState([]);
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('permissions');
                setPermissions(data.data)
            }
        )()
    }, [])

    const check = (id) => {
        if(permissionIds.some((s) => s === id)) {
            setPermissionIds(permissionIds.filter(s => s !== id));
            return;
        }

        setPermissionIds([...permissionIds, id]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('roles', {name: roleName, permissions: permissionIds});
        navigate('/roles');
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" onChange={e => setRoleName(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((permission) => {
                            return(
                                <div key={permission.id} className="form-check form-check-inline col-3">
                                    <input type="checkbox" className="form-check-input" 
                                        value={permission.id}
                                        onChange={e => check(permission.id)}
                                    />
                                    <label className="form-check-lable">{permission.name}</label>
                                </div>
                            )
                        })}                        
                    </div>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default CreateRole