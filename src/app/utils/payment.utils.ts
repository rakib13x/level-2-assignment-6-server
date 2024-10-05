import axios from 'axios';
import { Payment } from '../model/payment.model';

// Function to initiate payment with user data from the token
export const initiatePayment = async (req: Request, res: Response) => {
  const { totalPrice, customerAddress } = req.body;
  console.log('Received request body:', req.body);

  // Extract user info from token (attached by your existing auth middleware)
  const { _id: userId, userEmail, customerName, customerPhone } = req.user;

  console.log('Extracted user from token:', {
    userId,
    userEmail,
    customerName,
    customerPhone,
  });

  try {
    if (!totalPrice || !customerAddress) {
      // Validate request body
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transactionId = `TX-${Date.now()}`; // Generate a unique transaction ID

    // Make a request to the payment gateway to initiate the payment
    const response = await axios.post(
      process.env.PAYMENT_URL!,
      {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        tran_id: transactionId,
        success_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${transactionId}&status=success`,
        fail_url: `http://localhost:5000/api/v1/payment/confirmation?status=failed`,
        cancel_url: 'http://localhost:5173/', // Replace with your cancel URL
        amount: totalPrice.toFixed(2),
        currency: 'BDT',
        desc: 'Premium Subscription',
        cus_name: customerName, // Use extracted values from token
        cus_email: userEmail,
        cus_phone: customerPhone,
        cus_add1: customerAddress || 'N/A', // Optional address
        type: 'json',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the response for debugging
    console.log('Payment Initiation Response:', response.data);

    // Save the transaction and user details in the database
    await Payment.create({
      transactionId,
      user: userId, // User ID from token
      amount: totalPrice,
      status: 'pending', // Default status is pending
    });

    // Return the payment URL where the user will be redirected
    return res.status(200).json({ payment_url: response.data.payment_url });
  } catch (err: any) {
    // Log the error details for better debugging
    console.error('Error during payment initiation:', err);

    // Check if it's an Axios error and provide more context
    if (err.response) {
      return res.status(500).json({
        message: 'Payment initiation failed!',
        errorDetails: err.response.data, // Return details from the payment gateway
      });
    }

    return res.status(500).json({
      message: 'Payment initiation failed due to an internal server error.',
      errorDetails: err.message,
    });
  }
};

// Function to verify payment status
export const verifyPayment = async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  try {
    // Fetch the payment details from the payment gateway
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        request_id: transactionId,
        type: 'json',
      },
    });

    console.log('Full Payment Gateway Response:', response.data);

    // If the gateway response indicates invalid data
    if (response.data.status === 'Invalid-Data') {
      throw new Error(
        'Invalid transaction data. Please check the transaction ID and other details.'
      );
    }

    // Extract the payment status
    const paymentStatus = response.data.pay_status || 'Failed';

    // Check if the payment was successful
    if (paymentStatus === 'Successful') {
      // Find the payment record and user in the database
      const paymentRecord = await Payment.findOne({ transactionId }).populate(
        'user'
      );

      if (!paymentRecord) {
        throw new Error('Payment record not found.');
      }

      // Mark user as premium and update payment status
      const user = paymentRecord.user;
      user.isPremium = true;
      await user.save();

      // Update payment record to 'successful'
      paymentRecord.status = 'successful';
      await paymentRecord.save();

      // Return success response
      return res.status(200).json({
        message: 'Payment successful! You are now a premium member.',
        email: user.email,
        success: true,
      });
    } else {
      // Handle failed payment case
      return res.status(400).json({
        message: 'Payment failed!',
        success: false,
      });
    }
  } catch (err: any) {
    console.error('Payment verification failed:', err.message || err);
    return res.status(500).json({ message: 'Payment validation failed!' });
  }
};
