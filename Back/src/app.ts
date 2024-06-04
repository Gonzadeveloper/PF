import express from 'express';
import bodyParser from 'body-parser';
import routessRaiz  from './routes/index';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json()) // middleware que transforma la req.body a un json

app.use(cors())
app.use(morgan('dev'));

app.use('/',routessRaiz)

export default app;