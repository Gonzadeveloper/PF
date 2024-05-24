import { useState } from "react"
import { uploadImage } from "./Cloudinary"
import { useDispatch } from "react-redux"
import { newProduct } from "../../Redux/Actions/productActions"


function NewProduct() {

    const dispatch = useDispatch()

    type ValidationMsg = {
        name?: string,
        price?: string,
        description?: string,
        stock?: string,
        condition?: string,
        image?: string,
        categoryId?: string
    }

    type prod = {
        name: string,
        price: string,
        description: string,
        stock: string,
        condition: string,
        image: string,
        categoryId: string
    }

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
        condition: "",
        image: "",
        categoryId: "",
        userId: 3
    })

    const [error, setError] = useState<ValidationMsg>({
        name: "Por favor ingrese el nombre del producto"
    })

    function validate(input: prod): ValidationMsg {
        let msg: ValidationMsg = {}
        if (input.name == "") { msg.name = "Por favor ingrese el nombre del producto" }
        else if (!isNaN(Number(input.name))) { msg.name = "Agregue un título adecuado" }
        else if (input.name.trim().length < 4 || input.name.length > 35) { msg.name = "El título debe contener de 4 a 35 caracteres" }
        else if (input.price == "") { msg.price = "Por favor agregue un precio al producto" }
        else if (isNaN(Number(input.price))) { msg.price = "Solo números estan permitidos" }
        else if (input.description == "") { msg.description = "Por favor agregue una descripcion al producto" }
        else if (input.description.trim().length < 10) { msg.description = "La descripción debe tener al menos 10 caracteres" }
        else if (!isNaN(Number(input.description))) { msg.name = "Agregue una descripción adecuada" }
        else if (input.stock == "") { msg.stock = "Por favor ingrese cuantos productos desea vender" }
        else if (isNaN(Number(input.stock))) { msg.stock = "Solo números estan permitidos" }
        else if (input.condition == "") { msg.condition = "Por favor seleccione la condición del producto" }
        else if (input.categoryId=="") {msg.categoryId= "Elija al menos una categoría para el producto"}
        else if (input.image == "") { msg.image = "Por favor suba una foto del producto" }
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

            const url = await uploadImage(e.target.files[0])

            setProduct({
                ...product,
                image: url
            })

            setError(validate({
                ...product,
                image: url
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!error.name && !error.price && !error.description && !error.condition && !error.stock && !error.image) {
            //dispatch al back

            dispatch(newProduct({
                ...product,
                price: Number(product.price),
                stock: Number(product.stock),
                categoryId: Number(product.categoryId)
            }))

            setProduct({
                name: "",
                price: "",
                description: "",
                stock: "",
                condition: "",
                image: "",
                categoryId: "",
                userId: 3
            })
            setError({
                name: "Por favor ingrese el nombre del producto"
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
            <h2>Publica un producto a vender!</h2>
            <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow">
                <div className="mb-3">
                    <label className="form-label">Título</label>
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
                    <label className="form-label">Precio</label>
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
                    <label className="form-label">Descripción</label>
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
                    <label className="form-label">Stock</label>
                    <input
                        type="text"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        className={`form-control ${error.stock ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.stock}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Condición</label>
                    <select
                        name="condition"
                        value={product.condition}
                        onChange={handleChange}
                        className={`form-select ${error.condition ? 'is-invalid' : ''}`}
                    >
                        <option value="">-</option>
                        <option value="NUEVO">Nuevo</option>
                        <option value="USADO">Usado</option>
                    </select>
                    <div className="invalid-feedback">{error.condition}</div>
                </div>
                <div>
                    <label className="form-label">Categoría</label>
                    <select
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        className={`form-select ${error.categoryId ? 'is-invalid' : ''}`}
                    >
                        <option value="">-</option>
                        <option value="1">Celulares</option>
                        <option value="2">Notebooks</option>
                        <option value="3">Impresoras</option>
                        <option value="4">Redes</option>
                        <option value="5">Componentes PC</option>
                        <option value="6">Tablets</option>
                        <option value="7">Camaras</option>
                        <option value="8">Sonido</option>
                        <option value="9">Almacenamiento</option>
                        <option value="10">Smartwatch</option>
                        <option value="11">Monitores</option>
                        <option value="12">Consolas</option>
                    </select>
                    <div className="invalid-feedback">{error.categoryId}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={`form-control ${error.image ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error.image}</div>
                    {product.image !== "" && (
                        <div className="mt-3">
                            <img src={product.image} alt="imageupload" width="200px" className="img-thumbnail" />
                            <button type="button" className="btn btn-danger mt-2" onClick={handleDelete}>X</button>
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary w-100">Publicar</button>
            </form>
        </div>
    )
}

export default NewProduct