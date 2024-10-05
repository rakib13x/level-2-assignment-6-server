import { Request, Response } from 'express';
import { initiatePayment, verifyPayment } from '../utils/payment.utils';

export const paymentController = {
  initiatePayment: async (req: Request, res: Response) => {
    try {
      await initiatePayment(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Error initiating payment' });
    }
  },

  verifyPayment: async (req: Request, res: Response) => {
    try {
      await verifyPayment(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Error verifying payment' });
    }
  },
};
