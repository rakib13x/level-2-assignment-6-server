import mongoose from 'mongoose';

export interface TPayment {
  user: mongoose.Schema.Types.ObjectId;
  transactionId: string;
  amount: number;
  status: 'pending' | 'successful' | 'failed';
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}
