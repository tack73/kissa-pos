import express from 'express';
import ordersRouter from './orders.mjs';

const router = express.Router();
router.use('/orders', ordersRouter);

export default router;