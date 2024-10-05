
import React, { useState } from 'react';
import { useChitFundProgram } from '../utils/connection';
import { web3 } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { USDC_MINT } from '../utils/constants';

const JoinChitFund: React.FC = () => {
  const [chitFundAddress, setChitFundAddress] = useState('');
  const program = useChitFundProgram();

  const handleJoin = async (e: React.FormEvent) => {
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

      const collateralVault = await web3.PublicKey.findProgramAddress(
        [Buffer.from("collateral_vault"), chitFundPublicKey.toBuffer()],
        program.programId
      );

      await program.methods.joinChitFund()
        .accounts({
          chitFund: chitFundPublicKey,
          participant: participantPda,
          user: program.provider.publicKey,
          userTokenAccount: userTokenAccount[0],
          collateralVault: collateralVault[0],
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
      
      console.log("Successfully joined chit fund!");
    } catch (error) {
      console.error("Error joining chit fund:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Join a Chit Fund</h2>
      <form onSubmit={handleJoin} className="space-y-4">
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Join Chit Fund
        </button>
      </form>
    </div>
  );
};

export default JoinChitFund;
