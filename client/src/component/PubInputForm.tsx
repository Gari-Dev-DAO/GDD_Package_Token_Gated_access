import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Gateway from '../integrations/Gatway';
import { saveTheNewPub } from '../utils/fetchAPIData';
import { PublisherResponse } from '../utils/interfaces';
import { checkForImmediateWallet, checkForWallet, connectToWallet } from '../utils/walletProvider';
import "./Pubinputform.css"

const PubInputForm = () => {
  const [authorAddrs, setAuthorAddrs] = useState('');
  useEffect(() => {
    setAuthorAddrs(sessionStorage.getItem('usrAddr') as string);
  }, []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    authorName: '',
    authorAddrs: authorAddrs,
    chainId: '',
    chainName: '',
    tag: '',
    nftToken: '',
    nftAddrs: '',
    ftAddrs: '',
    about: '',
  });
  async function sendToDB(formDataa: PublisherResponse) {
    const result = await saveTheNewPub(formDataa);
    alert(result.msg);
    navigate('/pub/add');
  }
  async function handleClickForSubmit(event: any) {
    event.preventDefault();
    console.log(formData);
    await sendToDB(formData);
    setFormData({
      authorName: '',
      authorAddrs: '',
      chainId: '',
      chainName: '',
      tag: '',
      nftToken: '',
      nftAddrs: '',
      ftAddrs: '',
      about: '',
    });
  }
  function handleHomeClick() {
    navigate('/');
  }
  //todo Try to maintain the order of the rendering like using the conditional rendering.
  return (
    <div className='inputPage'>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <label htmlFor="full-name" >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="given-name"
                    placeholder="Alice Bob"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} 
                  />
                </div>

                <div>
                  <label htmlFor="public-address" >
                    Your Public Address
                  </label>
                  <input
                    type="text"
                    name="public-address"
                    id="public-address"
                    autoComplete="family-name"
                    value={formData.authorAddrs}
                    onChange={(e) => setFormData({ ...formData, authorAddrs: authorAddrs })}
                    placeholder={authorAddrs}
                  />
                </div>

                <div>
                  <label htmlFor="nft-address" >
                    NFT Address
                  </label>
                  <input
                    type="text"
                    name="nft-address"
                    id="nft-address"
                    autoComplete="family-name"
                    placeholder="0xcdf, 8k9n"
                    value={formData.nftAddrs}
                    onChange={(e) => setFormData({ ...formData, nftAddrs: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="chain-name" >
                    Chain Name
                  </label>
                  <select
                    id="chain-name"
                    name="chain-name"
                    autoComplete="country-name"
                    value={formData.chainName}
                    onChange={(e) => setFormData({ ...formData, chainName: e.target.value })}                   
                  >
                    <option>Ethereum</option>
                    <option>Solana</option>
                    <option>Polygon</option>
                  </select>
                </div>

                <div >
                  <label htmlFor="token-address" >
                    Fungible Token Address(FT)
                  </label>
                  <input
                    type="text"
                    name="token-address"
                    id="token-address"
                    value={formData.ftAddrs}
                    onChange={(e) => setFormData({ ...formData, ftAddrs: e.target.value })}
                    autoComplete="token-address"
                    placeholder="0xabc, 7yz"
                  />
                </div>

                <div>
                  <label htmlFor="chain-id" >
                    chain ID 
                  </label>
                  <select
                    id="chain-id"
                    name="chain-id"
                    autoComplete="chain-id"
                    value={formData.chainId}
                    onChange={(e) => setFormData({ ...formData, chainId: e.target.value })}
                  >
                    <option>SolDev</option>
                    <option>SolMain</option>
                    <option>PolMain</option>
                  </select>
                </div>

                <div >
                  <label htmlFor="auth-type">
                    Auth Type
                  </label>
                  <select
                    id="auth-type"
                    name="auth-type"
                    autoComplete="auth-type"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  >
                    <option>FT</option>
                    <option>NFT</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="nft-id" >
                    Token ID or Token Balance
                  </label>
                  <input
                    type="number"
                    name="nft-id"
                    id="nft-id"
                    autoComplete="address-level1"
                    value={formData.nftToken}
                    onChange={(e) => setFormData({ ...formData, nftToken: e.target.value })}
                    placeholder="Token Id if Auth is NFT and Balance if Token"
                  />
                </div>
              </div>
            </div>
            <div >
              <label htmlFor="about" >
                About
              </label>
              <div >
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="About Me ..type"
                  // defaultValue={''}
                />
              </div>
             
            </div>
              
            <div className=''>
            <Gateway /> 
            </div>  

            <div className=" ">
              <button
                onClick={handleHomeClick}
                className="btn"
              >
                Back To Home
              </button>
              <button
                type="submit"
                onClick={handleClickForSubmit}
                className="btn"
                >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PubInputForm;
