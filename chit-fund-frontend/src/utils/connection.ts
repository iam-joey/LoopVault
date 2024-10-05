import { Connection, PublicKey, Commitment } from '@solana/web3.js';
import { Program, AnchorProvider, Idl } from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import idl from '../idl/chit_fund_platform.json';

const programID = new PublicKey("7AEt2evGVZxnPxKHp2Nb5dNfPDPDdXJ9PexqtgdnHgF4");
const network = "https://api.devnet.solana.com";
const opts = {
  preflightCommitment: "processed" as Commitment
};

export const useChitFundProgram = () => {
  const wallet = useAnchorWallet();
  console.log("here in nasasa")
  if (!wallet) {
    return null;
  }

  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new AnchorProvider(connection, wallet, opts);
  const program = new Program(idl as unknown as Idl, programID, provider);

  return program;
};