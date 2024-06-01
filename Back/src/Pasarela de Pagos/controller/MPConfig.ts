import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { Request, Response } from "express";
import { Order } from '../../models/Order';
import {Payment} from '../../models/Payment';
import {ProductOrder} from '../../models/ProductOrder';




dotenv.config();

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN || '' });

const payment = async (req: Request, res: Response) => {
    const { userId, products } = req.body;

    try {
        // Crear la orden
        const nuevaOrden = await Order.create({
            userId: userId,
            orderDate: new Date(),
            orderStatus: 'Pendiente',
            deletedAt: new Date(),
    } as any );
          

        // Agregar productos a la orden
        const ordenProductos = products.map((prod: any) => ({
            ID_orden: nuevaOrden.id,
            ID_producto: prod.id,
            Cantidad: prod.quantity,
            Precio_por_unidad: prod.unit_price,
        }));
        await ProductOrder.bulkCreate(ordenProductos);

        // Crear preferencia de pago en MercadoPago
        const preferenceData = {
            items: products.map((prod: any) => ({
                title: prod.name,
                quantity: prod.quantity,
                unit_price: prod.unit_price,
            })),
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending",
            },
            auto_return: "approved",
            external_reference: `${nuevaOrden.id}`,
        };

       
    const preferenceResponse = await new Preference(client).create({ body: preferenceData });
    const preference = preferenceResponse;

    return res.json({ redirectUrl: preference.init_point });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

const handlePaymentSuccess = async (req: Request, res: Response) => {
    const external_reference = req.query.external_reference as string;

    try {
        // Actualizar el estado de la orden a "Pagado"
        await Order.update({ orderStatus: 'Pagado' }, { where: { id: external_reference } });

        // Registrar el pago
        const orden = await Order.findByPk(external_reference);
        if (orden) {
            await Payment.create({
                    orderId: orden.id,
                    paymentDate: new Date(),
                    amount: orden.amount ,
                    paymentMethod: 'MercadoPago',
            } as any );
        }

        res.send("Pago completado con éxito.");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar el pago');
    }
};

export { payment, handlePaymentSuccess };

// const payment = async (req: Request, res: Response) => {
//     const body = {
//         items: [
//             {
//                 id: req.body.id, // Add a unique identifier for each item
//                 title: req.body.name,
//                 description: req.body.description,
//                 quantity: req.body.quantity,
//                 unit_price: req.body.price,
//                 currency_id: "ARS",
//                 image: req.body.image,
//             },
//         ],
//         back_urls: {
//             success: "http://localhost:3000/",
//             failure: "http://localhost:5173/",
//             pending: "http://localhost:5173/",
//         },
//         auto_return: "approved",
//         binary_mode: true,
//     };

//     try {
//         const preference = await new Preference(client).create({ body });
//         return res.json({ redirectUrl: preference.init_point });
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

// export { payment };