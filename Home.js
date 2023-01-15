import React, { useState } from 'react';
import Map from '../Map';
import Navigation from '../Navigation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../services/user';
import { useDonation } from '../services/donation';
import Web3 from 'web3';
import { useWeb3 } from '../services/web3';

function Home() {
    const location = useLocation();
    const { user, setUser } = useUser();
    const { donation, setDonation } = useDonation();
    const { web3, accounts } = useWeb3();

    function handleSubmit(event) {
        event.preventDefault();
        // check if metamask is installed and the user is logged in
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.enable().then(() => {
                const amountInWei = web3.utils.toWei(donation.amount.toString(), 'ether');
                // call the smart contract function to process the donation
                processDonation(amountInWei, accounts[0]);
            });
        } else {
            console.log("Please install MetaMask to donate via cryptocurrency.")
        }
    }

    function processDonation(amountInWei, sender) {
        // logic to process the cryptocurrency donation using metamask
        console.log(`Processing cryptocurrency donation of ${amountInWei} wei from ${sender}`);
    }

    return (
        <div>             <Navigation />
        <h1>Welcome to FREEHAITI.org</h1>
        <p>We are a non-profit organization dedicated to improving the lives of the people of Haiti. We accept donations in the form of cash, credit card and cryptocurrency.</p>
        <Map />
        <form onSubmit={handleSubmit}>
            <label>
                Name:
            <input type="text" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </label>
            <br />
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
            <button type="submit">Donate</button>
        </form>
    </div>
);
}

export default Home;

