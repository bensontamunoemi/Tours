import express from 'express';
import morgan from 'morgan';
import path from 'path';
// routes
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const __dirname = path.resolve();

const app = express();
// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// ROUTES

// ROUTE HANDLERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
