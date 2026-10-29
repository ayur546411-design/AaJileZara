import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { authMiddleware } from './middleware/auth.js';
import authRoutes from './routes/auth.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import packagesRoutes from './routes/packages.routes.js';
import advisorsRoutes from './routes/advisors.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import advisoryRequestsRoutes from './routes/advisoryRequests.routes.js';
import dailyRoutes from './routes/daily.routes.js';
import recordingsRoutes from './routes/recordings.routes.js';
import costsRoutes from './routes/costs.routes.js';
import intakeFormsRoutes from './routes/intakeForms.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Global Authentication parser
app.use(authMiddleware);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Ji Le Zara Backend API',
    brand: 'Ji Le Zara — Soch se Shanti Tak',
    founder: 'Dr. Nilambari Dave, PhD',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    azureConfig: {
      storageReady: true,
      dailyVideoReady: true,
      database: 'Azure PostgreSQL / SQLite local',
    },
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/advisors', advisorsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/advisory-requests', advisoryRequestsRoutes);
app.use('/api/daily', dailyRoutes);
app.use('/api/recordings', recordingsRoutes);
app.use('/api/costs', costsRoutes);
app.use('/api/intake-forms', intakeFormsRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌸 Ji Le Zara Social Guidance API running on port ${PORT}`);
  console.log(`🌸 Tagline: "Pause · Reflect · Realign · Live Fully"`);
  console.log(`🌸 Philosophy: "Soch se Shanti Tak"`);
  console.log(`=======================================================`);
});

export default app;
