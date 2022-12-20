#### What?

This is a simple web app (proof of concept) version of Patreon for web3. Creators can set criteria for their communities, such as allowing only users with the special NFT or FT to join. This app currently supports Ethereum(EVM) and Solana main nets, test nets, and development nets.

#### How Auth Works?

Creators decide what criteria to use, such as which type of authentication they want for their users. Authentication is carried out by leveraging on-chain data. Alchemy APIs are used to connect to the individual chains in the backend of the app. For the EVM ecosystem, ethers js is used, while for the Solana ecosystem, Solana web3 js and metaplex js are used for FTs and NFTs, respectively. With on-chain data authentication, the app is fairly robust and reliable.

#### Can creators upload any content?

Currently, the app is built for reliable authentication infrastructure, and more features related to authentication have already been released. For now, creators can only upload text content, but in a few days they will also be able to upload pictures and videos, and the mode of storage will be decentralized like IPFS and Livepeer. With the support of push notifications using EPNS SDK.

#### Testing?

I myself bought an NFT on Polygon mainnet for testing purposes. The app is tested on both the mainnet and the development network. The mainnet of Polygon with an authentication type of NFT and the development net of Solana with an authentication type of FT. This is exactly what the video sample illustrates.

#### Tech Used?

    - Ethers Js
    - @metaplex-foundation/js
    - @solana/web3.js
    - CRA template
    - Express
