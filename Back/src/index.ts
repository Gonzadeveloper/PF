import express from "express"
import getAllProducts  from './routes/getAllProducts' ;
import  getProductByName from "./routes/getProductByName";
import getProductById from "./routes/getProductById";

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000

import db from "../models";
//import db = require("../models");

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

app.get ('/products', getAllProducts);
app.get ('/products/:name', getProductByName);
app.get ('/products/:id', getProductById);


app.get('/ping', (_req, res) => {
    console.log('someone pinged here!!');
    res.send('pong');
});

