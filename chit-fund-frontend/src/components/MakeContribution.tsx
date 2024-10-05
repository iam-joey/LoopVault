
import React, { useState } from 'react';
import { useChitFundProgram } from '../utils/connection';
import { web3, BN } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { USDC_MINT } from '../utils/constants';

const MakeContribution: React.FC = () => {
  const [chitFundAddress, setChitFundAddress] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const program = useChitFundProgram();

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !program.provider.publicKey) return;

    try {
      const chitFundPublicKey = new web3.PublicKey(chitFundAddress);
      const [participantPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("participant"), chitFundPublicKey.toBuffer(), program.provider.publicKey.toBuffer()],
        program.programId
      );

      const userTokenAccount = await web3.PublicKey.findProgramAddress(
        [program.provider.publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), USDC_MINT.toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const contributionVault = await web3.PublicKey.findProgramAddress(
        [Buffer.from("contribution_vault"), chitFundPublicKey.toBuffer()],
        program.programId
      );

      await program.methods.makeContribution(new BN(contributionAmount))
        .accounts({
          chitFund: chitFundPublicKey,
          participant: participantPda,
          user: program.provider.publicKey,
          userTokenAccount: userTokenAccount[0],
          contributionVault: contributionVault[0],
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      
      console.log("Successfully made contribution!");
    } catch (error) {
      console.error("Error making contribution:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Make a Contribution</h2>
      <form onSubmit={handleContribute} className="space-y-4">
        <div>
          <label className="block mb-1">Chit Fund Address</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter Chit Fund address"
            value={chitFundAddress}
            onChange={(e) => setChitFundAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Contribution Amount (USDC)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter contribution amount"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Make Contribution
        </button>
      </form>
    </div>
  );
};

export default MakeContribution;