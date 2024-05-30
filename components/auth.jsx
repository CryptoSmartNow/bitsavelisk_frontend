import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';

const LiskConnect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);

    try {
      if (window.ethereum) {
        // Request access to MetaMask accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Initialize the ethers provider
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Check if MetaMask is connected to a provider
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Connected address:', address);

        if (address) {
          // Redirect to the dashboard page on successful connection
          router.push('/dashboard');
        } else {
          console.error('MetaMask is not connected to a provider');
          alert('Connection failed. MetaMask is not connected.');
        }
      } else {
        console.error('MetaMask not found');
        alert('Connection failed. MetaMask not found.');
      }
    } catch (error) {
      console.error('MetaMask error:', error);
      alert('Connection failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <button className="btn btn_main" onClick={connectWallet} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default LiskConnect;
