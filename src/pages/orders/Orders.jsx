import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../componets/Paginator";
import Wrapper from "../../componets/Wrapper";

const hide = {
    maxHeight: 0,
    transition: '800ms ease-in'
}

const show = {
    maxHeight: '150px',
    transition: '800ms ease-out'
}

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0);
    const [selectedOrderId, setSelectedOrderId] = useState(0)

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`orders?page=${page}`);
                setOrders(data.data)
                setLastPage(data.meta.last_page)
            }
        )()

    },[page])

    const selectOrder = (orderId) => {
        setSelectedOrderId(selectedOrderId === orderId ? 0 : orderId);
    }

    return(
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/orders/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {orders.map((order) => {
                            return (   
                                <>                             
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>${order.total} USD</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <a 
                                                    href="#" 
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => selectOrder(order.id)}
                                                    >
                                                    View
                                                </a>                                            
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="overflow-hidden" style={selectedOrderId === order.id ? show : hide}>
                                                <table className="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Product Title</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col">Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.order_items.map((item) => {
                                                            return (
                                                                <tr key={item.id}>
                                                                    <td>{item.id}</td>
                                                                    <td>{item.product_title}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>${item.price} USD</td>
                                                                </tr>
                                                            )
                                                        })} 
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>                                        
                                    </tr>
                                </>
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

export default Orders;