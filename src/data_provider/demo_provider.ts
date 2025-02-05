import { Provider, IAgentRuntime, Memory, elizaLogger } from "@elizaos/core";

export const timeProvider: Provider = {
    get: async (_runtime: IAgentRuntime, _message: Memory) => {
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString("en-US");
        const currentYear = currentDate.getFullYear();
        elizaLogger.info("hello here");
        return `The current time is: ${currentTime}, ${currentYear}`;
    },
};