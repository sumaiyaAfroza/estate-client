import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const { propertyId, offerId } = useParams()
  const { user } = useAuth()
  const axios = useAxios()
  const axiosSecure = useAxiosSecure()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const { isLoading, data: offer } = useQuery({
    queryKey: ['offer', offerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user?.email}&role=user`);
      return Array.isArray(res.data) ? res.data.find(o => o._id === offerId) : null;
    },
    enabled: !!offerId && !!user?.email,
  });

  if (isLoading) return <div>Loading offer details...</div>;
  if (!offer) return <div>Offer not found.</div>;

  const amount = parseFloat(offer.offerAmount) || 0;
  const amountInCents = Math.round(amount * 100);

  if (amount <= 0) {
    return <div className="text-red-600">Invalid offer amount. Please contact support.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!stripe || !elements) {
      setError('Stripe not loaded. Try again later.');
      return;
    }

    setProcessing(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { 
          name: user?.displayName || user?.name || 'Anonymous', 
          email: user?.email 
        },
      });

      if (createError) {
        setError(createError.message);
        setProcessing(false);
        return;
      }

      console.log(amountInCents, propertyId);

      const { data } = await axios.post('/create-payment-intent', { 
        amountInCents,
        propertyId,
        offerId
      });

      const { clientSecret } = data;

      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmResult.error) {
        setError(confirmResult.error.message);
        setProcessing(false);
        return;
      }

      if (confirmResult.paymentIntent.status === 'succeeded') {
        const transactionId = confirmResult.paymentIntent.id;
        
        // Update both property and offer status
        await axios.put(`/property/${propertyId}/pay`, { 
          transactionId, 
          offerId 
        });
        
        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `<strong>Transaction ID: </strong><code>${transactionId}</code>`,
          confirmButtonText: 'Go to Dashboard'
        });
        
        // Navigate to property bought page to see updated status
        navigate('/dashboard/propertyBought');
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">Payment for Property: ${amount.toFixed(2)}</h2>
      <CardElement
        className="p-3 border rounded"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || processing || amount <= 0}
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;