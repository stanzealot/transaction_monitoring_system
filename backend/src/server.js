import express from 'express';
import cors from 'cors';

import {sequelize} from './db.js';
import './models.js'

import {seedDatabase} from './seed.js';
import transactionRoutes from './routes/transactions.js';
import disputeRoutes from './routes/disputes.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
})

app.use('/transactions', transactionRoutes);
app.use('/disputes', disputeRoutes);

await sequelize.sync()
await seedDatabase();
console.log('Database synchronized and seeded.');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
