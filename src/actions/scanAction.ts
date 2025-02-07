import { Action, AgentRuntime } from "@elizaos/core";

export const scanAction: Action = {
  name: "scan",
  description: "Please check my subscriptions.",
  handler: async (agent: AgentRuntime) => {
    
    return {
      user: "agent",
      content: { text: "It's all good" },
    };
  },
  similes: [],
  examples: [
    [
      {
        user: "user",
        content: {
          text: "Please check.",
        },
      },
      {
        user: "agent",
        content: {
          text: "Ok, let me check.",
          action: "scan",
        },
      },
    ],
    [
      {
        user: "user",
        content: {
          text: "Tell me about my subscriptions.",
        },
      },
      {
        user: "agent",
        content: {
          text: "Ok, let me check.",
          action: "scan",
        },
      },
    ],
  ],
  validate: async (agent: AgentRuntime) => {
    return true;
  },
};
