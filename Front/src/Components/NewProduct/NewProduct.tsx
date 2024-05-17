import { useState } from "react"
import { uploadImage } from "./Cloudinary"


function NewProduct() {

    type ValidationMsg = {
        name?: string,
        price?: string,
        description?: string,
        quantity?: string,
        condition?: string,
        image?: string
    }

    type prod = {
        name: string,
        price: string,
        description: string,
        quantity: string,
        condition: string,
        image: string
    }

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        quantity: "",
        condition: "",
        image: ""
    })

    const [error, setError] = useState<ValidationMsg>({
        name: "Please select a name for the product",
        price: "Please put a price to the product",
        description: "Please enter a description to the product",
        quantity: "Please put how many products you want to sale",
        condition: "Please select a condition to the product",
        image: "Please upload an image of the product"
    })
    
    function validate(input: prod): ValidationMsg {
        let msg: ValidationMsg = {}
        if (input.name == "") { msg.name = "Please select a name for the product" }
        if (input.price == "") { msg.price = "Please put a price to the product" }
        else if (isNaN(Number(input.price))) { msg.price = "Only numbers please" }
        if (input.description == "") { msg.description = "Please enter a description to the product" }
        if (input.quantity == "") { msg.quantity = "Please put how many products you want to sale" }
        else if (isNaN(Number(input.quantity))) { msg.quantity = "Only numbers please" }
        if (input.condition == "") { msg.condition = "Please select a condition to the product" }
        if (input.image == "") { msg.image = "Please upload an image of the product" }
        return msg
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault()
        setProduct({
            ...product,
            [e.currentTarget.name]: e.currentTarget.value
        })

        setError(validate({
            ...product,
            [e.currentTarget.name]: e.currentTarget.value
        }))
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            const url= await uploadImage(e.target.files[0])

            setProduct({...product,
                image:url})

            setError(validate({
                ...product,
                image:url
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!error.name && !error.price && !error.description && !error.condition && !error.quantity && !error.image) {
            //dispatch al back

            setProduct({
                name: "",
                price: "",
                description: "",
                quantity: "",
                condition: "",
                image: ""
            })
            setError({
                name: "Please select a name for the product",
                price: "Please put a price to the product",
                description: "Please enter a description to the product",
                quantity: "Please put how many products you want to sale",
                condition: "Please select a condition to the product",
                image: "Please upload an image of the product"
            })


            alert("Your product has been posted")
        } else {
            alert("Please complete the form correctly")
        }
    }

    const handleDelete = () => {
        setProduct({
            ...product,
            image: ""
        })

        setError({
            ...error,
            image: "Please upload an image of the product"
        })
    }

    console.log(product);


    return (
        <div className="container mt-5">
            <h2>Post a new product to sale!</h2>
            <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className={`form-control ${error.name ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.name}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className={`form-control ${error.price ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.price}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className={`form-control ${error.description ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.description}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="text"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        className={`form-control ${error.quantity ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.quantity}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Condition</label>
                    <input
                        type="text"
                        name="condition"
                        value={product.condition}
                        onChange={handleChange}
                        className={`form-control ${error.condition ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.condition}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={`form-control ${error.image ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.image}</div>
                    {product.image !== "" &&
                        <div className="mt-3">
                            <img src={product.image} alt="imageupload" width="200px" className="img-thumbnail" />
                            <button type="button" className="btn btn-danger mt-2" onClick={handleDelete}>X</button>
                        </div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Post</button>
            </form>
        </div>
    )
}

export default NewProduct