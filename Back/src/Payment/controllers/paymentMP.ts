import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { Request, Response } from "express";
import { Order } from "../../models/Order";
import { Payment } from "../../models/Payment";
import { Product } from "../../models/Product";
// import User from '../models/User';
import { ProductOrder } from "../../models/ProductOrder";
//import { constants } from 'buffer';
// import sequelize from '../database';  // Asume que tienes una configuración de sequelize

dotenv.config();
const URL = process.env.URL_TUNEL;

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN || "",
});

const payment = async (req: Request, res: Response) => {
  const { userId, products } = req.body;
  console.log(products);

  // Función para obtener la información de los productos
  const getProductData = async (products: any[]) => {
    const dataproduct = await Promise.all(
      products.map(async (prod: any) => {
        const producto = await Product.findByPk(prod.productId);
        if (producto) {
          // Puedes actualizar el stock aquí si es necesario
           await producto.update({ stock: producto.stock - prod.quantity });

          return {
            id: producto.id,
            name: producto.name,
            quantity: prod.quantity,
            unitPrice: prod.unitPrice,
          };
        }
        return null;
      })
    );

    // Filtrar los elementos nulos
    return dataproduct.filter((item) => item !== null);
  };

  try {
    // Crear la orden
    const nuevaOrden = await Order.create({
      userId: userId,
      orderDate: new Date(),
      orderStatus: "Pendiente",
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
    const items = await getProductData(products);
    console.log(items);

    // Obtener la orden

    // Crear preferencia de pago en MercadoPago
    const preferenceData = {
      items: items.map((prod: any) => ({
        id: String(prod.id),
        title: prod.name,
        quantity: prod.quantity,
        currency_id: "ARS",
        unit_price: prod.unitPrice,
      })),

      back_urls: {
        success: `${URL}/payment/success`,
        failure: `${URL}/payment/failure`,
        pending: `${URL}/payment/pending`,
      },
      auto_return: "approved",
      external_reference: `${nuevaOrden.id}`,
      notification_url: `${URL}/payment/notifications`,
    };

    const preferenceResponse = await new Preference(client).create({
      body: preferenceData,
    });
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
  const { external_reference, status} = req.query;
  console.log(req.query);
  console.log("APROBADO");
  
  try {
    console.log(req.query);

    if (status === "approved") {
      // // Registrar el pago
      const orden = await Order.findByPk(Number(external_reference));
      if (orden) {
        const productos = await ProductOrder.findAll({
          where: { orderId: orden.id },
        });
        const monto = productos.reduce(
          (acc, prod) => acc + prod.unitPrice * prod.quantity,
          0
        );

        await Payment.create({
          orderId: orden.id,
          paymentDate: new Date(),
          amount: monto,
          paymentMethod: "Mercadopago",
        } as any);
      }
      //res.redirect(`${URL}/success?payment_id=${payment_id}&status=${status}&order_id=${external_reference}`);
      res.send("Pago completado con éxito.");
      
      //res.redirect(`http://frontend-url/success?payment_id=${payment_id}&status=${status}&order_id=${external_reference}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar el pago");
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
    res.status(500).send("Error al procesar la notificación");
  }
};

// Nuevo controlador para verificar el estado de la orden
const verifyOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByPk(orderId, {
      include: [{ model: ProductOrder }, { model: Payment }],
    });

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener la orden" });
  }
};

export { payment, handlePaymentSuccess, handleNotifications, verifyOrder };
