import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { Request, Response } from "express";

dotenv.config();

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN || '' });

const payment = async (req: Request, res: Response) => {
    const body = {
        items: [
            {
                id: req.body.id, // Add a unique identifier for each item
                title: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                unit_price: req.body.price,
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

    try {
        const preference = await new Preference(client).create({ body });
        return res.json({ redirectUrl: preference.init_point });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { payment };