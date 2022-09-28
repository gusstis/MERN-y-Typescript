import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';

import videoRoutes from './routes/videos.routes';
 
const app= express()

app.set('port', process.env.PORT || 3000);
console.log('seteamos puerto ' + process.env.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(videoRoutes);



export default app;
