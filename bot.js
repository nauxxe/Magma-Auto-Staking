const { ethers } = require('ethers');
require('dotenv').config();
const cron = require('node-cron');

const RPC_URL = 'https://testnet-rpc.monad.xyz';
const CONTRACT_ADDRESS = '0x2c9C959516e9AAEdB2C748224a41249202ca8BE7';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const STAKE_SELECTOR = '0xd5575982';

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function stakeMonad(retry = 0) {
 try {
  const stakeAmount = ethers.utils.parseEther('0.2');
  const gasPrice = await provider.getGasPrice();
  const nonce = await provider.getTransactionCount(wallet.address, 'pending');

  const stakeTx = {
to: CONTRACT_ADDRESS,
data: STAKE_SELECTOR,
value: stakeAmount,
gasLimit: 800000,
gasPrice,
nonce
  };

  const txResponse = await wallet.sendTransaction(stakeTx);
  console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] Stake tx hash:`, txResponse.hash);
  await txResponse.wait();
  console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ✅ Staking 0.2 Monad berhasil!`);
 } catch (err) {
  console.error(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ❌ Gagal staking:`, err.message);
  if (retry < 2) setTimeout(() => stakeMonad(retry + 1), 60 * 1000);
 }
}

cron.schedule('0 15 * * *', () => stakeMonad(), { timezone: "Asia/Jakarta" });
cron.schedule('0 22 * * *', () => stakeMonad(), { timezone: "Asia/Jakarta" });

console.log("⏰ Scheduler aktif. Staking akan dilakukan pada jam 15:00 dan 22:00 WIB setiap hari.");
