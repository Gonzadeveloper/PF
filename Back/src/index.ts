import express from "express"
import getAllProducts  from './routes/getAllProducts' ;
import  getProductByName from "./routes/getProductByName";

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000

app.get ('/products', getAllProducts);
app.get ('/products/:name', getProductByName);

app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!');
    res.send('pong');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})