import { useEffect } from 'react';
import ConnectToWallet from './component/connectToWallet';
import Hero from './component/Hero';
import Dilect from './integrations/Dilect';

function App() {
  useEffect(() => {
    console.log((window as any).phantom?.solana?.isPhantom);
  });
  return (
    <div className='page'>
      <ConnectToWallet />
      <Dilect/>
    </div>
  );
}

export default App;
