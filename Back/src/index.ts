import express from "express"
import getAllProducts  from './routes/getAllProducts' ;
import  getProductByName from "./routes/getProductByName";
import getProductById from "./routes/getProductById";

<<<<<<< HEAD


const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json
=======
const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7

const PORT = 3000

app.get ('/products', getAllProducts);
app.get ('/products/:name', getProductByName);
app.get ('/products/:id', getProductById);

<<<<<<< HEAD
=======

>>>>>>> 861ec39cdd3f4948a622d76d8ce4fb31ef9b50c7
app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!');
    res.send('pong');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})