import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router";
import ImageUpload from "../../componets/ImageUpload";
import Wrapper from "../../componets/Wrapper"

const UpdateProduct = () => {
    const params = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const imageRef = useRef(null);
    const navigator = useNavigate();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products/${params.id}`)
                setTitle(data.title)
                setDescription(data.description)
                setImage(data.image)
                setPrice(data.price)
            }
        )()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();

        await axios.put(`products/${params.id}`, {
            title, description, image, price
        })

        navigator('/products')
    }

    const updateImage = (url) => {
        if(imageRef.current) {
            imageRef.current.value = url;
        }
        setImage(url)
    }

    return(
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label>Title</label>
                    <input type="text" className="form-control" defaultValue={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" defaultValue={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input type="text" ref={imageRef} className="form-control" defaultValue={image} onChange={e => setImage(e.target.value)} />
                        <ImageUpload uploaded={(url) => updateImage(url)}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default UpdateProduct