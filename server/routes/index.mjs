import express from 'express';
import ordersRouter from './orders.mjs';
import menuRouter from './menu.mjs';
import statusRouter from './status.mjs';

const router = express.Router();
router.use('/orders', ordersRouter);
router.use('/menu', menuRouter);
router.use('/status', statusRouter);

export default router;