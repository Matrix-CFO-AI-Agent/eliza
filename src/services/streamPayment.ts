//@ts-nocheck
import { Ed25519Keypair, fromB64, TransactionBlock } from "@mysten/sui";
import { CONFIG } from "../config.ts";
import { getSuiProvider } from "../utils/suiClient.ts";

export class StreamPaymentService {
  private provider = getSuiProvider();
  private contractAddress = CONFIG.CONTRACT_ADDRESS;

  // 初始化流支付
  async initializeStream(
    senderPrivateKey: string,
    recipientAddress: string,
    amountPerSecond: bigint,
    duration: number
  ) {
    try {
      const keypair = Ed25519Keypair.fromSecretKey(fromB64(senderPrivateKey));
      const tx = new TransactionBlock();

      // 调用合约的 initialize_stream 方法
      tx.moveCall({
        target: `${this.contractAddress}::stream_payment::initialize_stream`,
        arguments: [
          tx.pure(recipientAddress),
          tx.pure(amountPerSecond.toString()),
          tx.pure(duration),
        ],
      });

      const result = await this.provider.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
      });

      return result;
    } catch (error) {
      console.error("初始化流支付失败:", error);
      throw error;
    }
  }

  // 提取流支付
  async withdrawStream(recipientPrivateKey: string, streamId: string) {
    try {
      const keypair = Ed25519Keypair.fromSecretKey(
        fromB64(recipientPrivateKey)
      );
      const tx = new TransactionBlock();

      tx.moveCall({
        target: `${this.contractAddress}::stream_payment::withdraw`,
        arguments: [tx.pure(streamId)],
      });

      const result = await this.provider.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
      });

      return result;
    } catch (error) {
      console.error("提取流支付失败:", error);
      throw error;
    }
  }

  // 查询流支付状态
  async getStreamStatus(streamId: string) {
    try {
      const stream = await this.provider.getObject({
        id: streamId,
        options: {
          showContent: true,
        },
      });
      return stream;
    } catch (error) {
      console.error("查询流支付状态失败:", error);
      throw error;
    }
  }
}
