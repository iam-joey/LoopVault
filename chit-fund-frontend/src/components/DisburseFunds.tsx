// src/components/DisburseFunds.tsx

import React, { useState } from 'react';
import { useChitFundProgram } from '../utils/connection';
import { web3 } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { USDC_MINT } from '../utils/constants';

const DisburseFunds: React.FC = () => {
  const [chitFundAddress, setChitFundAddress] = useState('');
  const [borrowerAddress, setBorrowerAddress] = useState('');
  const program = useChitFundProgram();

  const handleDisburse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !program.provider.publicKey) return;

    try {
      const chitFundPublicKey = new web3.PublicKey(chitFundAddress);
      const borrowerPublicKey = new web3.PublicKey(borrowerAddress);

      const [borrowerPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("participant"), chitFundPublicKey.toBuffer(), borrowerPublicKey.toBuffer()],
        program.programId
      );

      const borrowerTokenAccount = await web3.PublicKey.findProgramAddress(
        [borrowerPublicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), USDC_MINT.toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const contributionVault = await web3.PublicKey.findProgramAddress(
        [Buffer.from("contribution_vault"), chitFundPublicKey.toBuffer()],
        program.programId
      );

      await program.methods.disburseFunds()
        .accounts({
          chitFund: chitFundPublicKey,
          borrower: borrowerPda,
          borrowerTokenAccount: borrowerTokenAccount[0],
          contributionVault: contributionVault[0],
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      
      console.log("Successfully disbursed funds!");
    } catch (error) {
      console.error("Error disbursing funds:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Disburse Funds</h2>
      <form onSubmit={handleDisburse} className="space-y-4">
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
          <label className="block mb-1">Borrower Address</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter borrower's address"
            value={borrowerAddress}
            onChange={(e) => setBorrowerAddress(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Disburse Funds
        </button>
      </form>
    </div>
  );
};

export default DisburseFunds;