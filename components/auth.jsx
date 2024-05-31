import { ethers } from 'ethers';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LiskConnect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);

    try {
      if (window.ethereum) {
        // Request access to MetaMask accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Check if MetaMask is connected to a provider
        if (window.ethereum?.isConnected()) {
          // Create an ethers.js provider using MetaMask
          const provider = new ethers.providers.Web3Provider(window.ethereum, {
            name: "ZetaChain Athens Testnet",
            chainId: 7001
          });

          // Get the current account address
          const accounts = await provider.listAccounts();

          // You can store the account address in your app's state or context
          const currentAccount = accounts[0];
          console.log('Connected Account:', currentAccount);

          // Redirect to the dashboard page on successful connection
          router.push('/dashboard');
        } else {
          console.error('MetaMask is not connected to a provider');
        }
      } else {
        console.error('MetaMask not found');
      }
    } catch (error) {
      console.error('MetaMask error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="">
      <button className="btn btn_main" onClick={connectWallet} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect Wallet'} 
      </button>
    </div>
  );
};

export default LiskConnect;