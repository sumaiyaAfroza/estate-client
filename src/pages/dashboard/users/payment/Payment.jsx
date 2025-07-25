


import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => (
    <Elements stripe={stripePromise}>
       <PaymentForm></PaymentForm>
    </Elements>
);

export default Payment;