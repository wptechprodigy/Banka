import express from 'express';

const app = express();
const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Banka. API resource',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
