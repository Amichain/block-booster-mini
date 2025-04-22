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
	await provider.on('block', async (tx: any) => {
		await mainTestsWallet.sendTransaction({
			to: ethers.ZeroAddress,
			value: ethers.parseEther('0')
		})
	})
	await provider.on('close', async (code) => {
		console.log('ws closed', code);
		await provider.destroy()
		await new Promise(r => setTimeout(r, 1000));
		return miner().catch(console.error)
	});
}
miner().catch(console.error)