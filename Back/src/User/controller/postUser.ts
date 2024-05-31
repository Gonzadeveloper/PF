
import { sequelize } from '../../config/database';
import { User } from '../../models/User';
import { Address } from '../../models/Address';
import { Request, Response } from 'express';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { transporter } from '../../config/mailer'; //aquí agregamos el import de transporter

interface UserData {
  name: string;
  email: string;
  password: string;
  typeuser: string;
  address: string;
  city: string;
  state: string;
  postalcode: string;
  country: string;
}

const postUser = async (req: Request, res: Response): Promise<void> => {
  const userdata: UserData = req.body;
  const transaction = await sequelize.transaction();

  try {
    console.log('Received user data:', userdata);

    // Crear un nuevo User dentro de la transacción
    const newUser = await User.create({
      name: userdata.name,
      email: userdata.email,
      password: userdata.password,
      typeuser: userdata.typeuser,
    } as any, { transaction });

    console.log('New user created:', newUser);

    // Crear una nueva Address dentro de la transacción
    const newAddress = await Address.create({
      address: userdata.address,
      city: userdata.city,
      state: userdata.state,
      postalcode: userdata.postalcode,
      country: userdata.country,
      userId: newUser.id,
    } as any, { transaction });

    console.log('New address created:', newAddress);

    // Si todo va bien, hacemos commit de la transacción
    await transaction.commit();

    console.log('User and Address created successfully.');
    res.status(201).json({ user: newUser, address: newAddress });

    // Enviar el correo electrónico de bienvenida
    await sendWelcomeEmail(newUser.email);  //ésta parte también la agregamos para el envío de correo


  } catch (error) {
    // Si hay algún error, hacemos rollback de la transacción
    await transaction.rollback();
    console.error('Error during transaction:', error);
    handleCreationError(error, res);
  }
};

function handleCreationError(error: any, res: Response): void {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.errors.map((e: any) => e.message).join(', '));
    res.status(400).json({ error: 'Validation error', details: error.errors });
  } else if (error instanceof UniqueConstraintError) {
    console.error('Unique constraint error:', error.errors.map((e: any) => e.message).join(', '));
    res.status(400).json({ error: 'Unique constraint error', details: error.errors });
  } else {
    console.error('Unknown error when creating user and address:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

async function sendWelcomeEmail(email: string) { //y toda esta función se agregó, hasta el final del try catch
  const mailOptions = {
    from: 'pf2024mp@gmail.com',
    to: email,
    subject: 'Bienvenido a Electroemporium',
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
                <h1 style="color: #172211; line-height: 1.5;">¡Bienvenido a Electroemporium!</h1>
                <h3 style="color: #172211; line-height: 1.5;">Tu registro en nuestra página fue realizado con éxito.</h3>
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
    console.log("Welcome email sent successfully.");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

export { postUser };