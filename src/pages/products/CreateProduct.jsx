import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import ImageUpload from "../../componets/ImageUpload";
import Wrapper from "../../componets/Wrapper"

const CreateProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const navigator = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        await axios.post('products', {
            title, description, image, price
        })

        navigator('/products')
    }

    return(
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input type="text" className="form-control" value={image} onChange={e => setImage(e.target.value)} />
                        <ImageUpload uploaded={(url) => setImage(url)}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control" onChange={e => setPrice(e.target.value)}/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default CreateProduct