import { Payment } from '../model/payment.model';
import { User } from '../model/user.model';
import { verifyPayment } from '../utils/payment.utils';

const confirmationService = async (transactionId: string, userId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  const paymentRecord = await Payment.findOne({ transactionId }).populate(
    'user'
  );
  if (!paymentRecord) throw new Error('Payment record not found.');

  if (verifyResponse.pay_status === 'Successful') {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found.');
    user.isPremium = true;
    await user.save();

    paymentRecord.status = 'successful';
    await paymentRecord.save();

    return {
      message: 'Successfully Paid! You are now a premium member.',
      success: true,
      email: user.email,
    };
  } else {
    paymentRecord.status = 'failed';
    await paymentRecord.save();

    return {
      message: 'Payment Failed!',
      success: false,
      email: verifyResponse.cus_email,
    };
  }
};

export const paymentServices = { confirmationService };
