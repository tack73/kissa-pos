import express from 'express';
import ordersRouter from './orders.mjs';
import menuRouter from './menu.mjs';
import statusRouter from './status.mjs';
import status9090Router from './9090.mjs';

const router = express.Router();
router.use('/orders', ordersRouter);
router.use('/menu', menuRouter);
router.use('/status', statusRouter);
router.use('/status9090', status9090Router);

export default router;