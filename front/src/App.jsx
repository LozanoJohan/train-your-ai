import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { useSDK } from '@metamask/sdk-react';
import { useState } from 'react';
import { ethers } from 'ethers';



export default function App() {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await requestAccount();
        console.log(ethers);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Now you can use 'provider' to interact with Ethereum.
      } catch (error) {
        console.error('Error connecting:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  }


  return (
    <>
      <h1>Entrena tu IA!</h1>
      <button onClick={connectWallet}>Comenzar</button>
      <h3>Wallet Address: {walletAddress}</h3>
    </>
  )
}


