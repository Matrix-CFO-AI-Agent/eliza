import { CONFIG } from "./config.js";
import { StreamPaymentService } from "./services/streamPayment.js";

async function main() {
  const streamPayment = new StreamPaymentService();

  // 初始化流支付
  const senderPrivateKey = CONFIG.PRIVATE_KEY;
  const recipientAddress =
    "0xbd4451ee5b0507647220b206547cdce11e49298035aaaa40ce8b738921d1428f";
  const amountPerSecond = BigInt(1000000); // 每秒支付金额
  const duration = 3600; // 持续时间（秒）

  try {
    // 创建流支付
    const initResult = await streamPayment.initializeStream(
      senderPrivateKey,
      recipientAddress,
      amountPerSecond,
      duration
    );
    console.log("流支付已创建:", initResult);

    // 获取流支付状态
    const streamId = "从initResult中获取的streamId";
    const status = await streamPayment.getStreamStatus(streamId);
    console.log("流支付状态:", status);

    // 提取流支付
    const recipientPrivateKey = "接收方私钥";
    const withdrawResult = await streamPayment.withdrawStream(
      recipientPrivateKey,
      streamId
    );
    console.log("提取结果:", withdrawResult);
  } catch (error) {
    console.error("操作失败:", error);
  }
}

main();
