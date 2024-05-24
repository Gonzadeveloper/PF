// const express = require('express');
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require('jwks-rsa');
// const passport = require('./config/auth');
const User = require('../../models/User');
// const authRoutes = require('./routes/auth');
require('dotenv').config();

// const app = express();
// const port = 3000;

// Middleware para verificar el token
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });
  
export {checkJwt};

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Middleware de sesión
// app.use(require('./config/session'));

// Inicializar Passport y gestionar la sesión de Passport
// app.use(passport.initialize());
// app.use(passport.session());

// Rutas de autenticación
// app.use(authRoutes);

// Ruta para manejar la autenticación
exports.authenticateUser = async (req:any, res:any) => {
    try {
      const { sub, email, name } = req.user;
      let existingUser = await User.findOne({ where: { auth0Id: sub } });
      
      if (!existingUser) {
        existingUser = await User.create({
          email,
          name,
          auth0Id: sub
        });
      }
      
      res.status(200).send({ message: 'User authenticated and stored in the database' });
    } catch (error) {
      res.status(500).send({ message: 'Error authenticating user', error });
    }
  };

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });