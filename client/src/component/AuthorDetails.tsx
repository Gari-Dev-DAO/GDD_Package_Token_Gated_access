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
    <div className="border border-slate-300 m-4 p-4 font-mono flex">
      <div className="">
        <div className="flex mx-1 px-1 my-1">
          <p>Author Name:</p>
          <p className="mx-2">{props.authorName}</p>
        </div>

        <div className="flex mx-1 px-1 my-1">
          <p>Author Address :</p>
          <p className="mx-2">{props.authorAddrs}</p>
        </div>
        <div className=" flex mx-1 px-1 my-1">
          <p>Chain ID: </p>
          <p className="mx-2">{props.chainId}</p>
        </div>
        <div className=" flex mx-1 px-1 my-1">
          <p>Chain Name: </p>
          <p className="mx-2">{props.chainName}</p>
        </div>
        <div className="flex mx-1 px-1 my-1">
          <p>Token Type: </p>
          <p className="mx-2">{props.tag}</p>
        </div>
        <div className="flex mx-1 px-1 my-1">
          <p>NFT Token ID or FT Balance: </p>
          <p className="mx-2">{props.nftToken}</p>
        </div>
        <div className="flex mx-1 px-1 my-1">
          <p>NFT Address: </p>
          <p className="mx-2">{props.nftAddrs}</p>
        </div>
        <div className="flex mx-1 px-1 my-1">
          <p>FT Address: </p>
          <p className="mx-2">{props.ftAddrs}</p>
        </div>
      </div>
      <div className="ml-60">
        <div>
          <p className="text-lg">About Me</p>
          <p className="my-8">{props.about}</p>
        </div>
        <div>
          <button onClick={handleJoin} className="my-8 rounded-full border border-slate-300 p-2 text-lg">
            {isJoined ? 'Joined' : 'Join Me'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
