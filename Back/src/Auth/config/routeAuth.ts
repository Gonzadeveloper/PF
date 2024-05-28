const express = require('express');
import {passport} from './auth';
const User = require('../../models/User');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), (_req:any, res:any) => {
  res.redirect('/');
});

router.get('/callback', (req:any, res:any, next:any) => {
  passport.authenticate('auth0', async (err:any, user:any, _info:any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    
    req.logIn(user, async (err:any) => {
      if (err) {
        return next(err);
      }

      try {
        // Obtén los datos del usuario desde Auth0 usando el access token
        const { accessToken } = user;
        const auth0UserInfo = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const { email, name, sub } = auth0UserInfo.data;

        // Verificar si el usuario existe en la base de datos
        let existingUser = await User.findOne({ where: { auth0Id: sub } });
        
        if (!existingUser) {
          // Crear un nuevo usuario en la base de datos
          existingUser = await User.create({
            email,
            name,
            auth0Id: sub
          });
        }

        res.redirect('/');
      } catch (dbError) {
        next(dbError);
      }
    });
  })(req, res, next);
});

router.get('/logout', (req:any, res:any, next:any) => {
  req.logout((err:any) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/failure', (_req:any, res:any) => {
  res.send('Failed to authenticate.');
});

router.get('/profile', (req:any, res:any) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.send(`Hello ${req.user.displayName}`);
});

module.exports = router;