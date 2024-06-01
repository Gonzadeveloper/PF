import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Request, Response } from 'express';
import {Order} from '../../models/Order';
//import {Payment} from '../../models/Payment';
// import Product from '../models/Product';
// import User from '../models/User';
import {ProductOrder} from '../../models/ProductOrder';
// import sequelize from '../database';  // Asume que tienes una configuración de sequelize

dotenv.config();

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN || '' });

const payment = async (req: Request, res: Response) => {
  const { userId, products } = req.body;
 console.log(products);
 
  try {
    // Crear la orden
    const nuevaOrden = await Order.create({
      userId: userId,
      orderDate: new Date(),
      orderStatus: 'Pendiente',
    } as any);

    // Agregar productos a la orden
    const ordenProductos = products.map((prod: any) => ({
      orderId: nuevaOrden.id,
      productId: prod.productId,
      quantity: prod.quantity,
      unitPrice: prod.unitPrice,
    }));
    //console.log(ordenProductos);
    
    await ProductOrder.bulkCreate(ordenProductos);

    // Crear preferencia de pago en MercadoPago
    const preferenceData = {
      items: products.map((prod: any) => ({
        title: prod.name,
        quantity: prod.quantity,
        unit_price: prod.unitPrice,
      })),
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
      external_reference: `${nuevaOrden.id}`,
      notification_url: "https://695c-186-169-78-25.ngrok-free.app/payment/notifications"
    };

    const preferenceResponse = await new Preference(client).create({ body: preferenceData });
    const preference = preferenceResponse;
    //console.log(preferenceResponse);
      
    return res.json({ redirectUrl: preference.init_point });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const handlePaymentSuccess = async (req: Request, res: Response) => {
  //const external_reference = req.query.external_reference as string;
  //const {collection_status} = req.query;
 console.log(req.query);
  

  try {
    console.log(req.query);
    //Actualizar el estado de la orden a "Pagado"
    // await Order.update({ orderStatus: 'Pagado' }, { where: { id: external_reference } });

    // // Registrar el pago
    // const orden = await Order.findByPk(external_reference);
    // if (orden) {
    //   const productos = await ProductOrder.findAll({ where: { orderId: orden.id } });
    //   const monto = productos.reduce((acc, prod) => acc + prod.unitPrice * prod.quantity, 0);

    //   await Payment.create({
    //     orderId: orden.id,
    //     paymentDate: new Date(),
    //     amount: monto,
    //     paymentMethod: 'MercadoPago',
    //   } as any);
    // }

    res.send("Pago completado con éxito.");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el pago');
  }
};

const handleNotifications = async (req: Request, res: Response) => {
  const paymentt = req.query;
  console.log(req.query);
  

  try {
    // Maneja la notificación de pago según el tipo de evento
    // if (paymentt.|ype === 'payment' ) {
    //   const orderId = payment.data.id;

    //   // Actualiza el estado de la orden a "Pagado"
    //   await Order.update({ orderStatus: 'Pagado' }, { where: { id: orderId } });

    //   // Registrar el pago (similar a handlePaymentSuccess)
    //   const orden = await Order.findByPk(orderId);
    //   if (orden) {
    //     const productos = await ProductOrder.findAll({ where: { orderId: orden.id } });
    //     const monto = productos.reduce((acc, prod) => acc + prod.unitPrice * prod.quantity, 0);

    //     await Payment.create({
    //       orderId: orden.id,
    //       paymentDate: new Date(),
    //       amount: monto,
    //       paymentMethod: 'MercadoPago',
    //     } as any);
    //   }
    // }

    res.status(200).send(paymentt);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la notificación');
  }
};

export { payment, handlePaymentSuccess, handleNotifications };