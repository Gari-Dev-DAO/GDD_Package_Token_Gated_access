import React from 'react';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import { GatewayProvider, useGateway, GatewayStatus } from '@civic/solana-gateway-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { IdentityButton } from '@civic/solana-gateway-react';

require('@solana/wallet-adapter-react-ui/styles.css');

const env = {
    gatekeeperNetwork: new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6'),
    clusterUrl: 'https://api.devnet.solana.com',
    cluster: 'devnet',
};

function RequestGatewayToken() {
    const { gatewayStatus, requestGatewayToken, gatewayToken } = useGateway();
    return (
        <>
            {/* <div>Wallet adapter connected</div> */}
            {/* {
                GatewayStatus[gatewayStatus] == 'ACTIVE' ? <p>TMNE INSAAN APNE KO PROOVE KIA</p> : <p>TM INSAAN HO KYA?</p>
            }
            <br />
            <button type='submit' onClick={requestGatewayToken}>Request Pass</button>
            <br />
            <div>Pass: {gatewayToken?.publicKey.toBase58()}</div> */}
        </>
    )
}

function Gateway() {
    const wallet = useWallet();
    const { publicKey } = wallet;
    const { gatekeeperNetwork, cluster, clusterUrl } = env;
    return (
        <GatewayProvider
            wallet={wallet}
            gatekeeperNetwork={gatekeeperNetwork}
            cluster={cluster}
            clusterUrl={clusterUrl}>
            {publicKey && <RequestGatewayToken />}
            <IdentityButton />
        </GatewayProvider>
    )
}

export default Gateway;
