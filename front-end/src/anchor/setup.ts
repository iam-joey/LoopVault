import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "./idl.json";
import type { ChitFundPlatform } from "./type";
import { getConnection } from "@/lib/constants";

export const programId = new PublicKey(
  "9pJ1GXPbXQPUvzLJsz3HVSLqQ1rEyxauvZDL5e9aBRx8"
);

const connection = getConnection();

export const program = new Program(idl as ChitFundPlatform, {
  connection,
});

export type chitFund = IdlAccounts<ChitFundPlatform>["chitFund"];
