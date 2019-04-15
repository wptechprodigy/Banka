import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.route';
import accountRoutes from './routes/accounts.route';
import transactionRoutes from './routes/transactions.route';
import errorHandler from './Middleware/error-handler';

// Initializing express and declaring port
const app = express();
const port = process.env.PORT || 9000;

// Parse incoming body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logging all request to the console
app.use(morgan('dev'));

// Cross Origin Resource Control
app.use(cors());

// Defining the api base url
const API_BASE_URL = '/api/v1';

// Defining all routes
app.use(`${API_BASE_URL}`, userRoutes);
app.use(`${API_BASE_URL}/accounts`, accountRoutes);
app.use(`${API_BASE_URL}/transactions`, transactionRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Banka. API resource',
  });
});

// Listening port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Global Error handler
app.use(errorHandler);

export default app;
