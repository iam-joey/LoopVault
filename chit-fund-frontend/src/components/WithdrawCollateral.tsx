
import React, { useState } from 'react';
import { useChitFundProgram } from '../utils/connection';
import { web3 } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { USDC_MINT } from '../utils/constants';

const WithdrawCollateral: React.FC = () => {
  const [chitFundAddress, setChitFundAddress] = useState('');
  const program = useChitFundProgram();

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !program.provider.publicKey) return;

    try {
      const chitFundPublicKey = new web3.PublicKey(chitFundAddress);
      const [participantPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("participant"), chitFundPublicKey.toBuffer(), program.provider.publicKey.toBuffer()],
        program.programId
      );

      const participantTokenAccount = await web3.PublicKey.findProgramAddress(
        [program.provider.publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), USDC_MINT.toBuffer()],
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const collateralVault = await web3.PublicKey.findProgramAddress(
        [Buffer.from("collateral_vault"), chitFundPublicKey.toBuffer()],
        program.programId
      );

      await program.methods.withdrawCollateral()
        .accounts({
          chitFund: chitFundPublicKey,
          participant: participantPda,
          participantTokenAccount: participantTokenAccount[0],
          collateralVault: collateralVault[0],
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      
      console.log("Successfully withdrew collateral!");
    } catch (error) {
      console.error("Error withdrawing collateral:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Withdraw Collateral</h2>
      <form onSubmit={handleWithdraw} className="space-y-4">
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
        <button type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          Withdraw Collateral
        </button>
      </form>
    </div>
  );
};

export default WithdrawCollateral;

