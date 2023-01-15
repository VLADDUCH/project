import React, { useState } from 'react';
import { useEthereum } from 'react-ethereum-hooks';
import { useStripe } from 'react-stripe-js';
import { useUser } from '../services/user';
import { useDonation } from '../services/donation';

function Donate() {
    const [error, setError] = useState(null);
    const { user, setUser } = useUser();
    const { donation, setDonation } = useDonation();
    const stripe = useStripe();
    const { ethereum } = useEthereum();

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !ethereum) {
            return setError('Stripe or Ethereum not found');
        }

        if (donation.paymentMethod === 'credit_card') {
            try {
                // logic to process the credit card donation using Stripe
                const { token } = await stripe.createToken();
                console.log(`Processing credit card donation of $${donation.amount} with token: ${token.id}`);
            } catch (err) {
                setError(err.message);
            }
        } else if (donation.paymentMethod === 'cryptocurrency') {
            try {
                // logic to process the cryptocurrency donation using ethereum
                const accounts = await ethereum.enable();
                const tx = {
                    from: accounts[0],
                    to: '0x...', // Contract address
                    value: '100000000000000000', // Amount in wei
                };
                console.log(`Processing cryptocurrency donation of ${tx.value} wei from ${tx.from}`);
                const receipt = await ethereum.sendTransaction(tx);
                console.log(`Transaction receipt: ${JSON.stringify(receipt)}`);
            } catch (err) {
                setError(err.message);
            }
        } else {
            // logic to process the cash donation
            console.log(`Processing cash donation of $${donation.amount}`);
        }
    };

    return (
        <div>
            <h1>Donate</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </label>
                <br/>
<label>
Email:
<input type="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
</label>
<br />
<label>
Amount:
<input type="number" name="amount" value={donation.amount} onChange={(e) => setDonation({ ...donation, amount: e.target.value })} />
</label>
<br />
<label>
Payment Method:
<select value={donation.paymentMethod} onChange={(e) => setDonation({ ...donation, paymentMethod: e.target.value })}>
<option value="cash">Cash</option>
<option value="credit_card">Credit Card</option>
<option value="cryptocurrency">Cryptocurrency</option>
</select>
</label>
<br />
{donation.paymentMethod === 'credit_card' && (
<button type="submit">Donate with credit card</button>
)}
{donation.paymentMethod === 'cryptocurrency' && (
<button type="submit">Donate with cryptocurrency</button>
)}
{donation.paymentMethod === 'cash' && (
<button type="submit">Donate with cash</button>
)}
</form>
{error && <p style={{ color: 'red' }}>{error}</p>}
</div>
);
}

export default Donate;
