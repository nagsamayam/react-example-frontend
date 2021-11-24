import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../componets/Wrapper";

const Products = () => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products?page=${page}`);
                setProducts(data.data)
                setLastPage(data.meta.last_page)
            }
        )()

    },[page])

    const next = () => {
        if(page < lastPage) {
            setPage(page + 1)
        }
    }

    const prev = () => {
        if(page >= 1) {
            setPage(page - 1)
        }
    }

    const del = async (id) => {
        if(window.confirm('Are you sure want to delete this product?')) {
            await axios.delete(`products/${id}`);
            setProducts(products.filter((product) => product.id !== id))
        }
    }

    return(
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {products.map((product) => {
                            return (                                
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td><img src={product.image} width="30" height="30" alt={product.title} /></td>
                                    <td>${product.price} USD</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => del(product.id)}>
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

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={prev}>Previous</a>
                    </li>
                    <li className="page-item">
                        <a href="#" className="page-link"
                            onClick={next}
                        >Next</a>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    )
}

export default Products;