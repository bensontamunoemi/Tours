import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect(process.env.DATABASE_LOCAL).then((res) => {
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
