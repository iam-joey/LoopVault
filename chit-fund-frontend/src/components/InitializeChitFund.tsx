import React, { useState, useEffect } from 'react';
import { useChitFundProgram } from '../utils/connection';
import { useWallet } from '@solana/wallet-adapter-react';
import { web3, BN } from '@project-serum/anchor';

const InitializeChitFund: React.FC = () => {
  const [contributionAmount, setContributionAmount] = useState('');
  const [cycleDuration, setCycleDuration] = useState('');
  const [totalCycles, setTotalCycles] = useState('');
  const [collateralRequirement, setCollateralRequirement] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [disbursementSchedule, setDisbursementSchedule] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const program = useChitFundProgram();
  const wallet = useWallet();

  useEffect(() => {
    if (!program) {
      setError("Failed to load Chit Fund program. Please check your wallet connection and try again.");
    } else {
      setError(null);
    }
  }, [program]);

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!program || !wallet.publicKey) {
      setError("Wallet not connected");
      setIsLoading(false);
      return;
    }

    try {
      const chitFundKeypair = web3.Keypair.generate();
      const disbursementScheduleArray = disbursementSchedule.split(',').map(num => new BN(num.trim()));

      await program.methods.initializeChitFund(
        new BN(contributionAmount),
        new BN(cycleDuration),
        new BN(totalCycles),
        new BN(collateralRequirement),
        Number(maxParticipants),
        disbursementScheduleArray
      )
      .accounts({
        chitFund: chitFundKeypair.publicKey,
        creator: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([chitFundKeypair])
      .rpc();

      console.log("Chit Fund initialized with address:", chitFundKeypair.publicKey.toString());
      // You might want to save this address or display it to the user
    } catch (err) {
      console.error("Error initializing Chit Fund:", err);
      setError(`Failed to initialize Chit Fund: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Initialize Chit Fund</h2>
      <form onSubmit={handleInitialize} className="space-y-4">
        <div>
          <label className="block mb-1">Contribution Amount (in lamports)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Cycle Duration (in seconds)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={cycleDuration}
            onChange={(e) => setCycleDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Total Cycles</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={totalCycles}
            onChange={(e) => setTotalCycles(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Collateral Requirement (in lamports)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={collateralRequirement}
            onChange={(e) => setCollateralRequirement(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Max Participants</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Disbursement Schedule (comma-separated amounts in lamports)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={disbursementSchedule}
            onChange={(e) => setDisbursementSchedule(e.target.value)}
            placeholder="e.g., 1000000,2000000,3000000"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Initializing...' : 'Initialize Chit Fund'}
        </button>
      </form>
    </div>
  );
};

export default InitializeChitFund;