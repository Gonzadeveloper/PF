import { Request, Response } from 'express';
//import { sequelize } from '../../config/database';
import { Order } from '../models/Order';
import { Product } from '../models/Product'; // Asumiendo que tienes un modelo de Producto
//import nodemailer from 'nodemailer';
import { transporter } from "../config/mailer";
import { User } from '../models/User';

// Configuración del transporte de nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'pf2024mp@gmail.com',
//     pass: 'yourpassword', // Asegúrate de usar variables de entorno para las credenciales
//   },
// });

// Función para obtener datos de productos
const getProductData = async (products: any[]) => {
  const dataproduct = await Promise.all(
    products.map(async (prod: any) => {
      const producto = await Product.findByPk(prod.productId);
      if (producto) {
        // Puedes actualizar el stock aquí si es necesario
        // await producto.update({ stock: producto.stock - prod.quantity });

        return {
          id: producto.id,
          name: producto.name,
          image: producto.image,
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

const getUserEmailById = async (userId: any) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      return user.email;
    } else {
      return null; // O lanza un error si prefieres
    }
  } catch (error) {
    console.error('Error al obtener el email del usuario:', error);
    throw error; // O maneja el error de otra manera si prefieres
  }
};

// Función para obtener una orden por ID
const getOrderById = async (orderId: number) => {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId
      },
      include: [{ all: true, required: false }],
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    return order;
  } catch (error) {
    console.error('Unable to perform CRUD operations:', error);
    throw error;
  }
};

// Función para enviar el correo
export const sendEmail = async (req: Request, res: Response) => {
  const { userId, orderId } = req.query;

  if (!orderId) {
    return res.status(400).send("orderId es necesario");
  }

  try {
    const order = await getOrderById(Number(orderId));
    const productData = await getProductData(order.productOrder);
    const email = await getUserEmailById(Number(userId));

    // Configuración del correo
    const mailOptions = {
      from: 'electroemporiumsrl@gmail.com', // Manteniendo el remitente original
      to: `${email}`, // Correo destino
      subject: 'Electroemporium: compra exitosa.',
      html: `
      <div dir="ltr" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <tbody>
            <tr>
              <td align="center" style="background-color: #172211; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <a href="https://electroemporium.com" target="_blank" style="display: inline-block;">
                  <img src="https://i.ibb.co/j5r7vfp/Whats-App-Image-2024-05-10-at-12-01-24-AM.jpg" alt="Logo Electroemporium" style="display: block; margin: 0 auto; border-radius: 70px" width="140">
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 40px 20px; background-color: #ffffff;">
                <h1 style="color: #172211; line-height: 1.5; margin-bottom: 20px;">¡Tu compra fue realizada con éxito!</h1>
                <h3 style="color: #172211; line-height: 1.5; margin-bottom: 20px;">Gracias por elegirnos, esperamos que disfrutes tu compra.</h3>
                <p style="color: #172211; line-height: 1.5; font-size: 16px;">Saludos cordiales, equipo Electroemporium.</p>
                <h3 style="color: #172211; line-height: 1.5; margin-bottom: 20px;">Detalles de tu pedido:</h3>
                <ul style="color: #172211; line-height: 1.5; font-size: 16px;">
                  ${productData.map(product => `
                    <li>
                    <strong>${product!.name}</strong> - Cantidad: ${product!.quantity}, Precio unitario: ${product!.unitPrice}
                      <img src="${product!.image}" alt="${product!.name}" style="display: block; margin: 10px 0; max-width: 100px; height: auto;">
                     </li>
                  `).join('')}
                </ul>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #172211; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                <p style="color: #ffffff; font-size: 12px;">&copy; 2024 Electroemporium. Todos los derechos reservados.</p>
                <p style="color: #ffffff; font-size: 12px;">Si tienes alguna pregunta, <a href="mailto:pf2024mp@gmail.com" style="color: #ffffff; text-decoration: underline;">contáctanos</a>.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Correo enviado exitosamente" });
    return
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send(error);
  }
  return
};