import { Request, Response } from "express";
import { transporter } from "../config/mailer";

export const sendEmail = async (req: Request, res: Response) => {
  const {email} = req.query;
  
  const mailOptions = {
    from: 'pf2024mp@gmail.com', // Manteniendo el remitente original
    to: `${email}`, // Correo destino
    subject: 'Electroemporium: compra exitosa.',
    html: `
    <div dir="ltr" style="font-family: Arial, sans-serif;">
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <tbody>
            <tr>
              <td align="center" style="background-color: #172211;">
                <a href="https://electroemporium.com" target="_blank">
                  <img src="https://i.ibb.co/j5r7vfp/Whats-App-Image-2024-05-10-at-12-01-24-AM.jpg" alt="Logo Electroemporium" style="display: block; margin: 20px auto;" width="140">
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #ffffff;">
                <h1 style="color: #172211; line-height: 1.5;">¡Tu compra fue realizada con éxito!</h1>
                <h3 style="color: #172211; line-height: 1.5;">Gracias por elegirnos, esperamos que disfrutes tu compra.</h3>
                <p style="color: #172211; line-height: 1.5; font-size: 16px;">Saludos cordiales, equipo Electroemporium.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #172211;">
                <p style="color: #ffffff; font-size: 12px;">&copy; 2024 Electroemporium. Todos los derechos reservados.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({
      message: "Correo enviado exitosamente",
    });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send(error);
  }
};



// import dotenv from 'dotenv';
// dotenv.config();
// import { transporter } from "../config/mailer";
// import { Request, Response } from 'express';

// export const sendEmail = async (_req: Request, res: Response) => {
//   const mensaje = {
//     from: 'pf2024mp@gmail.com',
//     to: 'maugoretta@gmail.com',
//     subject: 'Este es el topico del correo de prueba',
//     text: 'Este es el contenido del correo de prueba'
//   };
  
//   try {
//     const info = await transporter.sendMail(mensaje);
//     console.log(info);
//     // Enviar respuesta de éxito al cliente
//     res.status(200).json({
//       message: 'Correo enviado exitosamente',
//       info: info
//     });
//   } catch (error) {
//     console.error('Error al enviar el correo:', error);
//     // Enviar respuesta de error al cliente
//     res.status(500).json({
//       message: 'Error al enviar el correo',
//       error: error
//     });
//   }
// };
