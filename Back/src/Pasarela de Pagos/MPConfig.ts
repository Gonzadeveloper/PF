import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig} from "mercadopago";
import { Preference } from "mercadopago";

dotenv.config();

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN || '' });

const app = express();
// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const payment = async (req:any, res:any) => {
    const body = {
        items: [
          {
            id: req.body.id, // Add a unique identifier for each item
            title: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity, 
            unit_price: Number(req.body.price),
            currency_id: "ARS",
            image: req.body.image,
          },
        ],
        back_urls: {
          success: "http://localhost:3000/",
          failure: "http://localhost:5173/",
          pending: "http://localhost:5173/",
        },
        auto_return: "approved",
        binary_mode: true,
    };
    res.json(body);
    try {
        const preference = await new Preference(client).create({ body });
        res.json({redirectUrl: preference.init_point});
    } catch (error) {
        res.json(error);
    }
};
export {payment};

// app.post("/create_preference", async (_req, res) => {
//     const body = {
//     //...
//     };

// });

// app.listen(port, () => {
//     console.log("Servidor corriendo en el puerto:", port);
// });