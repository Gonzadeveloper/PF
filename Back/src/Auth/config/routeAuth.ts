// import express from 'express';
// import { auth } from 'express-openid-connect';

// const app = express();

// app.use(auth({
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SESSION_COOKIE_SECRET,
//   baseURL: 'https://pf-deploy-mamzsgzhi-gpw-aterdrinker.vercel.app',
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`
// }));

// app.get('/callback', (_req, res) => {
//   res.redirect('/MiPerfil');
// });

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });