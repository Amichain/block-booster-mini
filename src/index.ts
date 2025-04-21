/**
 * I am just a (very) lightweight block booster for custom L1.
 * I wait for a new tx then send a dummy tx to force new block generation.
 */
import {ethers} from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const miner = async () => {
	const ws = process.env.WEBSOCKET_RPC
	const provider = new ethers.WebSocketProvider(ws)

	const mainTestsWallet = ethers.Wallet.fromPhrase(process.env.SEED as string, provider);
	await provider.addListener('block', async (tx: any) => {
		await mainTestsWallet.sendTransaction({
			to: ethers.ZeroAddress,
			value: ethers.parseEther('0')
		})
	})

}
miner().catch(console.error)