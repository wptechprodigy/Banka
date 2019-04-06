import express from 'express';

const app = express();
const port = process.env.PORT || 9000;

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
