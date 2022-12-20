import detectEthereumProvider from '@metamask/detect-provider';
const checkForChainId = async (provider: any) => {
  const chainId = await provider.request({ method: 'eth_chainId' });
  console.log(chainId);
};
export const checkForWallet = async (): Promise<boolean> => {
  // const provider = await getProviderInstance();
  if (!sessionStorage.getItem('usrAddr')?.length) {
    return true;
  }
  return false;
};
export const checkForImmediateWallet = async () => {
  const currentWallet = await connectToWallet();
  if (currentWallet.flag && currentWallet.acc === sessionStorage.getItem('usrAddr')) {
    return true;
  } else {
    window.alert('Connected Account Chnaged');
    return false;
  }
};
const handleAccountsChanges = (accounts: []) => {
  if (accounts.length === 0) {
    console.log('Please connect to MM');
  } else {
    console.log(accounts);
  }
};
export const connectToWallet = async () => {
  const provider = await getProviderInstance();
  console.log(provider.on('accountsChanged', handleChnageAcc));

  if (provider) {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    return { acc: accounts[0], flag: true };
  } else {
    return { flag: false };
  }
};
const getProviderInstance = async (): Promise<any> => {
  return await detectEthereumProvider();
};
const handleChnageAcc = (acc: any) => {
  return acc[0];
};

const getProvider = () => {
  if ('phantom' in (window as any)) {
    const provider = (window as any).phantom?.solana;
    if (provider?.isPhantom) {
      return provider;
    }
  }
};

export const connectToPhantom = async () => {
  const provider = getProvider();
  try {
    const resp = await provider.connect();
    console.log(resp.publicKey.toString());
    return { msg: resp.publicKey.toString(), flag: true };
  } catch (err) {
    console.log('Error Occured During Wallet connection');
    return { msg: 'Error occured During wallet connection', flag: false };
  }
};
