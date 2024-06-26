import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connect } from './config/db/index.js';
import routes from './routes/index.js';
import { error } from './app/middlewares/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({ path: '.env.development.local' });
connect();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: process.env.WEBSITE,
    credentials: true,
  }),
);
app.use(cookieParser(process.env.COOKIES_KEY));

routes(app);

app.use(error);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
