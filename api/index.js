import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import UserController from './controllers/users.controller';

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const API_URL = '/api/v1/users';

app.post(API_URL, UserController.createANewUser);
app.get(API_URL, UserController.getAllUsers);
app.get(`${API_URL}/:id`, UserController.getOneUserById);
app.put(`${API_URL}/:id`, UserController.updateAUser);
app.delete(`${API_URL}/:id`, UserController.deleteAUser);

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
