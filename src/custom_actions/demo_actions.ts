import { Provider, IAgentRuntime, Memory, elizaLogger,Action } from "@elizaos/core";

export const customAction: Action = {
    name: "CUSTOM_ACTION",
    similes: ["ALTERNATE_NAME", "OTHER_TRIGGER"],
    description: "Detailed description of when and how to use this action",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        // Validation logic
        return true;
    },
    handler: async (runtime: IAgentRuntime, message: Memory) => {
        // Implementation logic
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Trigger message" },
            },
            {
                user: "{{user2}}",
                content: { text: "Response", action: "CUSTOM_ACTION" },
            },
        ],
    ],
};