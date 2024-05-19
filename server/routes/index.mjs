import express from 'express';
import ordersRouter from './orders.mjs';
import menuRouter from './menu.mjs';

const router = express.Router();
router.use('/orders', ordersRouter);
router.use('/menu', menuRouter);

export default router;