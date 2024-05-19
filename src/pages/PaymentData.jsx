import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';


function PaymentData() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    const stripePromise = loadStripe('pk_test_51Ll6i0FezQmx9aELbJa7DHN8iiuqyVdNq45WcsJIOIyFlHh3oxC0T1UR2Ez26pEFyQByy1DU0392KcqHVPcgf7I100thbAmuEC');

    const stripe = await stripePromise;
    try {
      const paymentIntents = await stripe.paymentIntents.list({ limit: 10 });
      setPayments(paymentIntents.data);
      console.log('Dati dei pagamenti:', paymentIntents.data);
    } catch (error) {
      console.error('Errore durante il recupero dei dati dei pagamenti:', error);
    }
  };

  console.log('payments:', payments);

  return (
    <div>
      <h2>Dati Pagamenti</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>{payment.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentData;
