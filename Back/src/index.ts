import express from "express"
import getAllProducts  from './routes/getAllProducts' ;
import  getProductByName from "./routes/getProductByName";

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000

app.use ('/products', getAllProducts);
app.use ('/products/:name', getProductByName);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})