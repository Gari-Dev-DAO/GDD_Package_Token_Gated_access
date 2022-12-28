#### What?

This is a simple web app (proof of concept) version of Patreon for web3. Creators can set criteria for their communities, such as allowing only users with the special NFT or FT to join. This app currently supports Ethereum(EVM) and Solana main nets, test nets, and development nets.

#### How Auth Works?

Creators decide what criteria to use, such as which type of authentication they want for their users. Authentication is carried out by leveraging on-chain data. Alchemy APIs are used to connect to the individual chains in the backend of the app. For the EVM ecosystem, ethers js is used, while for the Solana ecosystem, Solana web3 js and metaplex js are used for FTs and NFTs, respectively. With on-chain data authentication, the app is fairly robust and reliable. Only User(member) public address and Author(community creator) public address is required to verify if a User holds the FT/NFT specified by Author.

#### Can creators upload any content?

Currently, the app is built for reliable authentication infrastructure, and more features related to authentication have already been released. For now, creators can only upload text content, but in a few days they will also be able to upload pictures and videos, and the mode of storage will be decentralized like IPFS and Livepeer. With the support of push notifications using EPNS SDK.

#### Testing?

I myself bought an NFT on Polygon mainnet for testing purposes. The app is tested on both the mainnet and the development network. The mainnet of Polygon with an authentication type of NFT and the development net of Solana with an authentication type of FT. This is exactly what the video sample illustrates.

#### Tech Used?

    - Ethers Js
    - @metaplex-foundation/js
    - @solana/web3.js
    - CRA template for FE.
    - Express

#### Local Setup

```
Requirements:
Node(Version): 18(LTS)
Yarn(latest)

clone the repo
cd
cd server && yarn install
cd
cd client && yarn install
cd

First remove .example from .env.example and fill the KEY with value
yarn start

```

### Endpoints

The endpoints only states the two endpoints which specifically used mainly for Authentication.

POST|`http://localhost:4000/api/pub/add`| To register a new Author

```
{
  "data": {
    "authorName": <string>,
    "ftAddrs": <string>,
    "nftAddrs": <string>,
    "authorAddrs": <string>,
    "nftToken": <string>,
    "chainId": <string>,
    "chainName": <string>,
    "tag": <string>
  }
}
```

Response

```
{ msg: 'Registered as Author' }

```

Now to Join the already registered Author just provide the author address and member address

POST|`http://localhost:4000/api/sub/add`| To register a new Author

```
{
  "data":{
  "userAddrs": <member address string>,
  "pubAddr": <already registered author address string>
  }
}
```

Response

```
{ response: { msg: 'You just subscribed', data: Creator Data like(Blogs, Pics), status: 200 } }

```

A author registration is conventional, to authenticate the user,

1. First creator/author data is retrieved from the DB with `pubAddr`
2. Check for the chainName either SOL or ETH, then chain Id mainnet, devnnet etc.
3. Check for type of auth like with NFT or FT
4. Init the class SolApi or EvmApi ref(`server/src/utils/web3.ts`) as per above data
5. Call the required auth public method like `checkNfts, checkBalance` ref(`server/src/services/subAuthentication.ts`)
6. Which returns boolean.  
   In the ref(`server/src/utils/web3.ts`) ethersjs and solana web3js connect to the Alchemy endpoint to query onchain data. For EVM ethers js connects to contract and calls the ABI, for Solana getBalance() and for NFT metaplex getAllByOwners and findByMint data intersection is used.
