import express from 'express';
import Routes from './routes';

const app = express();
app.use(Routes);

app.listen(3333, () => console.log(">> Server UP on port 3333"));
