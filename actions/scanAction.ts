import { Action, AgentRuntime } from "@elizaos/core";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { getFaucetHost, requestSuiFromFaucetV1 } from "@mysten/sui/faucet";
import { MIST_PER_SUI } from "@mysten/sui/utils";

export const scanAction: Action = {
  name: "scan",
  description: "Please check my subscriptions.",
  handler: async (agent: AgentRuntime) => {
    // replace <YOUR_SUI_ADDRESS> with your actual address, which is in the form 0x123...
    const MY_ADDRESS =
      "0x56c2bb64079e0a709ff61f4880482658f2c747bcdd8a4d6b256b48b5075cc7ee";

    // create a new SuiClient object pointing to the network you want to use
    const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

    // Convert MIST to Sui
    const balance = (balance) => {
      return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
    };

    // store the JSON representation for the SUI the address owns before using faucet
    const suiBefore = await suiClient.getBalance({
      owner: MY_ADDRESS,
    });

    await requestSuiFromFaucetV1({
      // use getFaucetHost to make sure you're using correct faucet address
      // you can also just use the address (see Sui TypeScript SDK Quick Start for values)
      host: getFaucetHost("testnet"),
      recipient: MY_ADDRESS,
    });

    // store the JSON representation for the SUI the address owns after using faucet
    const suiAfter = await suiClient.getBalance({
      owner: MY_ADDRESS,
    });

    // Output result to console.
    console.log(
      `Balance before faucet: ${balance(
        suiBefore
      )} SUI. Balance after: ${balance(suiAfter)} SUI. Hello, SUI!`
    );
    return {
      user: "agent",
      content: { text: "It's all good" },
    };
  },
  similes: [],
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Please check my subscriptions.",
          action: "scan",
        },
      },
      {
        user: "{{user2}}",
        content: {
          text: "Please check.",
          action: "scan",
        },
      },
    ],
  ],
  validate: async (agent: AgentRuntime) => {
    return true;
  },
};
