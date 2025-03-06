import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import knex from './config/database';
import userRoutes from './routes/userRoutes';
import addressRoutes from './routes/addressRoutes';
import postRoutes from './routes/postRoutes';
import { errorHandler } from './middlewares/errorHandler';
import createExpressApp from './config/express';

// Load environment variables
dotenv.config();

// Initialize Express application
const app = createExpressApp();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/posts', postRoutes);

// Error Handling Middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
  });


// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  process.exit();
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

// Run Database Migrations
if (process.env.NODE_ENV !== 'test') {
  knex.migrate.latest()
    .then(() => console.log("✅ Migrations Applied Successfully"))
    .catch((err) => console.error("Migration Failed:", err));


// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server currently running on http://localhost:${PORT}`);
});
};
export default app;
