import express from "express"
import getAllProducts  from './routes/getAllProducts' ;
import getProductByName from "./routes/getProductByName";
import getProductById from "./routes/getProductById";

const app = express()


// Configuración de la sesión
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
}));

// Inicializar Passport y Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/MiPerfil'
  },
  function( profile: any, done: Function) {
   // accessToken: string, refreshToken: string, extraParams: any,
    return done(null, profile);
  }
);

app.use(passport.initialize());
app.use(passport.session());

// Configurar Passport para usar la estrategia de Auth0
passport.use(strategy);

// Guardar el perfil de usuario en la sesión
passport.serializeUser(function(user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function(user: any, done:any) {
  done(null, user);
});

// Rutas de inicio de sesión y cierre de sesión
app.get('/login', passport.authenticate('auth0'));
app.get('/callback', passport.authenticate('auth0', { failureRedirect: '/login' }), function(_req, res) {
  // Redirigir al usuario después de iniciar sesión exitosamente
  res.redirect('/');
});




app.use(express.json()) // middleware que transforma la req.body a un json

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'auG6_Kf52jXOk8dSNcEtDifshjHgVDm4D7y8DH8wQqOvIjpNuzT1Vm8JpdnS4BhX',
    baseURL: 'http://localhost:3000',
    clientID: 'Xqv1NfgoqHqhwJjYdMASLNl4lPIjOawK',
    issuerBaseURL: 'https://dev-pywymllismpo3klw.us.auth0.com'
  };

const PORT = 3000

app.get ('/products', getAllProducts);
app.get ('/products/:name', getProductByName);
app.get ('/products/:id', getProductById);
app.post ('/products/product/', postProduct);
app.post ('/user/', postUser);

app.put ('/products/:id', putProduct);

app.use(auth(config));

app.get('/', (req: any, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req: any, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const init = async () => {
    try {
      await sequelize.sync({ force: false });
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  init();
  
  export { Product, Category, User, Address };

//   const server = require('./src/app.js');
// const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });