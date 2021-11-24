import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../componets/Paginator";
import Wrapper from "../../componets/Wrapper";

const Users = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users?page=${page}`);
                setUsers(data.data)
                setLastPage(data.meta.last_page)
            }
        )()

    },[page])

    const del = async (id) => {
        if(window.confirm('Are you sure want to delete this user?')) {
            await axios.delete(`users/${id}`);
            setUsers(users.filter((user) => user.id !== id))
        }
    }

    return(
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/users/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {users.map((user) => {
                            return (                                
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roles.map((role)=> role.name)}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary">
                                                Edit
                                            </Link>
                                            <a 
                                                href="#" 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={(e) => del(user.id)}>
                                                Delete
                                            </a>                                            
                                        </div>
                                    </td>
                                </tr>                                
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Paginator 
                page={page} 
                lastPage={lastPage} 
                pageChanged={(page) => setPage(page)} 
            />
        </Wrapper>
    )
}

export default Users;