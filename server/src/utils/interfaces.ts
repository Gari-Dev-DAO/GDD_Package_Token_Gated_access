import { Metadata, Nft, Sft } from '@metaplex-foundation/js';
export interface PublisherInterface {
  authorName: string;
  ftAddrs: string;
  authorAddrs: string;
  nftAddrs: string;
  authorHash?: string;
  picArr?: [];
  subsArr?: [];
  chainId?: string;
  chainName?: string;
  nftToken?: string;
  tag: string;
  about: string;
}

export interface WebThreeMethods {
  getBalanceByAddress(): Promise<number>;
  getAllTokensByWalletAddress(): any;
  getAllNftsByAddress(): Promise<Array<Metadata | Nft | Sft>>;
  getNftData(): Promise<string>;
}

export interface WebThreeMethodsEVM {
  retriveNftBalanceByContract(): Promise<string>;
  retrieveBalanceForAddrs(): Promise<string>;
}

export interface PublisherResponse {
  authorName: string;
  authorAddrs: string;
  chainId: string;
  chainName: string;
  tag: string;
  nftToken?: string;
  nftAddrs?: string;
  ftAddrs?: string;
  about: string;
}
