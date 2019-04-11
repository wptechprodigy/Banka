import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.route';
import accountRoutes from './routes/accounts.route';

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const API_BASE_URL = '/api/v1';

app.use(`${API_BASE_URL}/users`, userRoutes);
app.use(`${API_BASE_URL}/accounts`, accountRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Banka. API resource',
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
