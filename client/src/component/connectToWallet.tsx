import React, { useEffect, useState } from 'react';
import { checkForImmediateWallet, checkForWallet } from '../utils/walletProvider';
import ConnectBtn from './ConnectBtn';
import { checkForPublisher } from '../utils/external';
import { useNavigate } from 'react-router-dom';
import { checkForAuthorExist } from '../utils/fetchAPIData';
import './app.css'

function ConnectToWallet() {
  // const [walletStatus, setWalletStatus] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  async function handleLoginClick() {
    const userAddrs = sessionStorage.getItem('usrAddr') as string;
    const flag = await checkForAuthorExist(userAddrs);
    console.log(flag);
    if (isLoggedIn && flag.response) {
      navigate('/pub/add');
    }
  }
  async function handleToBPub() {
    const userAddrs = sessionStorage.getItem('authorAddrs') as string;
    const flag = await checkForPublisher(userAddrs);
    if (flag) {
      // navigate("/pub/add")
      navigate('/pub/form');
    }
  }

  return (
    <div style={{display:'flex',justifyContent:'space-around'}} className='connect-wallet'>
      <ConnectBtn />
      <button >Home</button>
      <button  onClick={handleLoginClick}>
        Login
      </button>
      <button onClick={handleToBPub}>
        Become a Creator
      </button>
    </div>
  );
}

export default ConnectToWallet;
