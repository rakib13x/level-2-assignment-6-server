import express from 'express';
import { paymentController } from '../../controllers/payment.controller';
import { authenticateToken } from '../../middlewares/authenticateToken';

const router = express.Router();
// Route for initiating payment
router.post('/initiate', authenticateToken, paymentController.initiatePayment);

// Route for verifying payment
router.get('/confirmation', paymentController.verifyPayment);

export const PaymentRoutes = router;
