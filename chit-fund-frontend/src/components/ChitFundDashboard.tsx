
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import InitializeChitFund from './InitializeChitFund';
import JoinChitFund from './JoinChitFund';
import MakeContribution from './MakeContribution';
import WithdrawCollateral from './WithdrawCollateral';

const ChitFundDashboard: React.FC = () => {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('initialize');

  if (!connected) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Connect your wallet to get started</h2>
        <p>Use the "Select Wallet" button in the top right corner to connect.</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'initialize' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-l-lg`}
          onClick={() => setActiveTab('initialize')}
        >
          Initialize Chit Fund
        </button>
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'join' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('join')}
        >
          Join Chit Fund
        </button>
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'contribute' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('contribute')}
        >
          Make Contribution
        </button>
        <button
          className={`flex-1 py-2 px-4 ${activeTab === 'withdraw' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-r-lg`}
          onClick={() => setActiveTab('withdraw')}
        >
          Withdraw Collateral
        </button>
      </div>

      {activeTab === 'initialize' && <InitializeChitFund />}
      {activeTab === 'join' && <JoinChitFund />}
      {activeTab === 'contribute' && <MakeContribution />}
      {activeTab === 'withdraw' && <WithdrawCollateral />}
    </div>
  );
};

export default ChitFundDashboard;
