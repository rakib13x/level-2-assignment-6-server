import mongoose, { model, Schema } from 'mongoose';
import { TPayment } from '../interface/payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending',
    },
    paymentMethod: { type: String, default: 'credit_card' },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<TPayment>('Payment', paymentSchema);
