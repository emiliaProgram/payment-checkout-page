'use client';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import styles from './CheckoutForm.module.css';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('United States');
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ price: 'price_1JXXXXXX', quantity: 1 }],
        email,
        name,
        address,
        country,
        saveInfo,
      }),
    });

    const { id } = await res.json();

    const { error } = await stripe?.redirectToCheckout({ sessionId: id }) ?? {};
    if (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Pay with card</h2>
      <h3>Amount to Pay: $20.00</h3>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Debit/Credit Card information
        <CardElement className={styles.cardElement} />
      </label>
      <label>
        Name on card
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Billing address
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="AU">Australia</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
        </select>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={saveInfo}
          onChange={(e) => setSaveInfo(e.target.checked)}
        />
        Save my info for secure 1-click checkout
      </label>
      <button type="submit" disabled={!stripe || loading}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
