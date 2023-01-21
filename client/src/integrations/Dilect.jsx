import '@dialectlabs/react-ui/index.css';
import {
    DialectUiManagementProvider,
    DialectThemeProvider,
    DialectNoBlockchainSdk,
} from '@dialectlabs/react-ui';
import {
    DialectSolanaSdk
} from '@dialectlabs/react-sdk-blockchain-solana';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useMemo, useEffect } from 'react';
import { BottomChat, Inbox, Notification } from '@dialectlabs/react-ui';
import { useToggle } from '../hooks/useToggle';
import { BsFillChatTextFill } from "react-icons/bs";

const SdkProvider = ({ children }) => {
    const solanaWallet = useWallet();
    const [dialectSolanaWalletAdapter, setDialectSolanaWalletAdapter] = useState(null)

    const dialectConfig = useMemo(() => ({
        environment: 'production',
        dialectCloud: {
            tokenStore: 'local-storage',
        }
    }), []);

    const solanaConfig = useMemo(() => ({
        wallet: dialectSolanaWalletAdapter,
    }), [dialectSolanaWalletAdapter]);

    useEffect(() => {
        setDialectSolanaWalletAdapter(solanaWalletToDialectWallet(solanaWallet));
    }, [solanaWallet]);

    if (dialectSolanaWalletAdapter) {
        return (
            <DialectSolanaSdk config={dialectConfig} solanaConfig={solanaConfig}>
                {children}
            </DialectSolanaSdk>
        );
    }

    return <DialectNoBlockchainSdk>{children}</DialectNoBlockchainSdk>;
}


const DialectProviders = ({ children }) => {
    return (
        <SdkProvider>
            <DialectThemeProvider theme='dark'>
                <DialectUiManagementProvider>
                    {children}
                </DialectUiManagementProvider>
            </DialectThemeProvider>
        </SdkProvider>
    );
}


const SolanaChat = (children) => {
    const [isToggle, makeToggle] = useToggle(false)
    return (
        <DialectProviders>
            <button onClick={makeToggle} style={{ position: 'fixed', right: '0', top: '30%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><BsFillChatTextFill color='#fec200' size={42} /></button>
            <div style={{ position: 'fixed', zIndex: 1000, right: '5px', bottom: '5px', height: '300px', overflow: 'auto' }}>
                {isToggle && <Inbox dialectId="dialect-inbox" />}
            </div>
        </DialectProviders>
    );
}

export default SolanaChat


const solanaWalletToDialectWallet = (
    wallet
) => {
    if (
        !wallet.connected ||
        wallet.connecting ||
        wallet.disconnecting ||
        !wallet.publicKey
    ) {
        return null;
    }

    return {
        publicKey: wallet.publicKey,
        signMessage: wallet.signMessage,
        signTransaction: wallet.signTransaction,
        signAllTransactions: wallet.signAllTransactions,
        diffieHellman: wallet.wallet?.adapter?._wallet?.diffieHellman
            ? async (pubKey) => {
                return wallet.wallet?.adapter?._wallet?.diffieHellman(pubKey);
            }
            : undefined,
    };
};