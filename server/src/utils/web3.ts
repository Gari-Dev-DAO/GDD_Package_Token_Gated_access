import { Metadata, Metaplex, Nft, Pda, Sft } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';
import { WebThreeMethods, WebThreeMethodsEVM } from './interfaces';
import { erc20Abi, nftAbi } from './erc721Abi';
// todo Refactor for extend with OOP and SOLID for individual extension to Sol and Eth
// GOD class for All web3 methods
export class SolApi implements WebThreeMethods {
  constructor(private solUri: string, private usrAddrs: string, private authorMintAddress: string) {}
  private async initilizeConnection(): Promise<Connection> {
    const connectionInstance = await new Connection(this.solUri);
    return connectionInstance;
  }

  private async initNftConnection(): Promise<Metaplex> {
    const myConnectionInstance = await this.initilizeConnection();
    const metaplex = new Metaplex(myConnectionInstance);
    return metaplex;
  }
  public async getBalanceByAddress(): Promise<number> {
    const myConnectionInstance = await this.initilizeConnection();
    const usrPubKey = this.getPubKeyByAddr(this.usrAddrs);
    const balanceofUser = await myConnectionInstance.getBalance(usrPubKey);
    return balanceofUser;
  }
  private getPubKeyByAddr(addrs: string): PublicKey {
    return new PublicKey(addrs);
  }
  private getStrByPubKey(pubKey: PublicKey | Pda): string {
    return new PublicKey(pubKey).toString();
  }
  public async getAllTokensByWalletAddress() {
    const myConnectionInstance = await this.initilizeConnection();
    const usrPubKey = this.getPubKeyByAddr(this.usrAddrs);
    const usrAccountInfo = await myConnectionInstance.getProgramAccounts(usrPubKey);
    return usrAccountInfo;
  }
  public async getAllNftsByAddress(): Promise<Array<Metadata | Nft | Sft>> {
    const myNftConnectionInstance = await this.initNftConnection();
    const usrPubKey = this.getPubKeyByAddr(this.usrAddrs);
    const usrNfts = await myNftConnectionInstance.nfts().findAllByOwner({
      owner: usrPubKey,
    });
    return usrNfts;
  }

  public async getNftData(): Promise<string> {
    const myNftConnectionInstance = await this.initNftConnection();
    const usrPubKey = this.getPubKeyByAddr(this.authorMintAddress);
    const usrNfts = await myNftConnectionInstance.nfts().findByMint({ mintAddress: usrPubKey });
    return usrNfts.uri;
  }
}

export class EvmApi implements WebThreeMethodsEVM {
  constructor(
    private chainUri: string,
    private usrAddrs: string,
    private contractAddress: string,
    private tokenId?: string
  ) {}
  private async initEvmConnection() {
    return await new ethers.providers.JsonRpcProvider({ url: this.chainUri });
  }
  public async retriveNftBalanceByContract(): Promise<string> {
    let type = 0;
    this.tokenId?.length! > 0 ? (type = 1) : (type = 2);
    const myNftConnection = await this.initEvmConnection();
    // const val = await nftContract.balanceOf(this.usrAddrs, this.tokenId); // number like 100000 if i own else zero
    switch (type) {
      case 1:
        const nftContract = new ethers.Contract(this.contractAddress, nftAbi, myNftConnection);
        const values = await nftContract.balanceOf(this.usrAddrs, parseInt(this.tokenId!));
        return values.toString();
        break;
      case 2:
        const ercContract = new ethers.Contract(this.contractAddress, erc20Abi, myNftConnection);
        const value = ercContract.balanceOf(this.usrAddrs);
        return value.toString();
      default:
        const balance = await myNftConnection.getBalance(this.usrAddrs);
        return balance.toString();
        break;
    }
  }
  public async retrieveBalanceForAddrs(): Promise<string> {
    const providerConnection = await this.initEvmConnection();
    const balance = await providerConnection.getBalance(this.usrAddrs);
    return balance.toString();
  }
}
