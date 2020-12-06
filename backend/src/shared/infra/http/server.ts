import 'reflect-metadata';
import express from 'express';

import routes from './routes';
import '../typeorm';
import '../../Container';

const app = express();
app.use(routes);

app.listen(3333, () => console.log('>> Server UP on port 3333'));
