import { WebThreeMethods, WebThreeMethodsEVM } from 'src/utils/interfaces';

export class SubscriberAuthentication {
  constructor(private SolApiInstance: WebThreeMethods, private EvmApiInstance: WebThreeMethodsEVM) {}
  /**
   * @param type 0 for solana and 1: for eth, evm chains.
   * Returns the Promise<flag> true|false
   */
  public async checkNfts(type: 0 | 1): Promise<boolean> {
    if (type === 0) {
      // first get the mint address, i.e. author provided address and then call it with the same.
      const authorUri = await this.SolApiInstance.getNftData();
      const userAllNfts = await this.SolApiInstance.getAllNftsByAddress();
      const filterUserNfts = userAllNfts.filter((singleNftData) => {
        return singleNftData.uri === authorUri;
      });
      if (filterUserNfts.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      const balanceOfNft = await this.EvmApiInstance.retriveNftBalanceByContract();
      if (parseInt(balanceOfNft) > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  /**
   * @param type 0 for solana and 1: for eth, evm chains.
   * Returns the Promise<flag> true|false
   */
  public async checkBalance(type: 0 | 1): Promise<boolean> {
    if (type === 0) {
      const usrBalance = await this.SolApiInstance.getBalanceByAddress();
      if (usrBalance > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      const usrBalance = await this.EvmApiInstance.retrieveBalanceForAddrs();
      if (parseInt(usrBalance) > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}
