import { useNavigate } from 'react-router-dom';
import { subToPub } from '../utils/fetchAPIData';
import { PublisherResponse } from '../utils/interfaces';
import { useEffect, useState } from 'react';

const AuthorDetails = (props: PublisherResponse) => {
  const navigate = useNavigate();
  const [isJoined, handleIsJOined] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(props.authorAddrs) === sessionStorage.getItem('usrAddr')) {
      handleIsJOined(true);
    }
  });
  function handleJoined(authorAddrs: string, userAddrs: string) {
    localStorage.setItem(authorAddrs, userAddrs);
    handleIsJOined(true);
  }
  async function handleJoin() {
    const myaddrs = sessionStorage.getItem('usrAddr') as string;
    const result = await subToPub(props.authorAddrs, myaddrs);
    sessionStorage.setItem('authorAddrs', props.authorAddrs);
    console.log(props.authorAddrs);
    console.log(myaddrs);
    console.log(result);
    if (result.response.status === 200) {
      alert(result.response.msg);
      handleJoined(props.authorAddrs, myaddrs);
      navigate('/sub/content', { state: { value: result.response.data } });
    } else {
      alert(result.response);
    }
  }
  return (
    <div>
      <div >
        <div >
          <p>Author Name:</p>
          <p>{props.authorName}</p>
        </div>

        <div >
          <p>Author Address :</p>
          <p >{props.authorAddrs}</p>
        </div>
        <div >
          <p>Chain ID: </p>
          <p >{props.chainId}</p>
        </div>
        <div >
          <p>Chain Name: </p>
          <p>{props.chainName}</p>
        </div>
        <div>
          <p>Token Type: </p>
          <p >{props.tag}</p>
        </div>
        <div>
          <p>NFT Token ID or FT Balance: </p>
          <p >{props.nftToken}</p>
        </div>
        <div >
          <p>NFT Address: </p>
          <p >{props.nftAddrs}</p>
        </div>
        <div>
          <p>FT Address: </p>
          <p >{props.ftAddrs}</p>
        </div>
      </div>
      <div >
        <div>
          <p>About Me</p>
          <p>{props.about}</p>
        </div>
        <div>
          <button onClick={handleJoin} >
            {isJoined ? 'Joined' : 'Join Me'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
