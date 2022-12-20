import { useEffect } from 'react';
import ConnectToWallet from './component/connectToWallet';
import Hero from './component/Hero';
function App() {
  useEffect(() => {
    console.log((window as any).phantom?.solana?.isPhantom);
  });
  return (
    <div>
      <ConnectToWallet />
      <Hero />
    </div>
  );
}

export default App;
