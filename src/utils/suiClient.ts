//@ts-nocheck
import { Connection, JsonRpcProvider } from "@mysten/sui";

export const getSuiProvider = () => {
  const connection = new Connection({
    fullnode: "https://fullnode.testnet.sui.io",
    faucet: "https://faucet.testnet.sui.io/gas",
  });
  return new JsonRpcProvider(connection);
};
