import express from 'express';
import morgan from 'morgan';

// routes
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// ROUTES

// ROUTE HANDLERS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
