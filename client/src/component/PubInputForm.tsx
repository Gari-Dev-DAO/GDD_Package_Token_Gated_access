import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Gateway from '../integrations/Gatway';
import { saveTheNewPub } from '../utils/fetchAPIData';
import { PublisherResponse } from '../utils/interfaces';
import { checkForImmediateWallet, checkForWallet, connectToWallet } from '../utils/walletProvider';

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
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="public-address" className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="nft-address" className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="chain-name" className="block text-sm font-medium text-gray-700">
                    Chain Name
                  </label>
                  <select
                    id="chain-name"
                    name="chain-name"
                    autoComplete="country-name"
                    value={formData.chainName}
                    onChange={(e) => setFormData({ ...formData, chainName: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Ethereum</option>
                    <option>Solana</option>
                    <option>Polygon</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label htmlFor="token-address" className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="chain-id" className="block text-sm font-medium text-gray-700">
                    chain ID
                  </label>
                  <select
                    id="chain-id"
                    name="chain-id"
                    autoComplete="chain-id"
                    value={formData.chainId}
                    onChange={(e) => setFormData({ ...formData, chainId: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>SolDev</option>
                    <option>SolMain</option>
                    <option>PolMain</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="auth-type" className="block text-sm font-medium text-gray-700">
                    Auth Type
                  </label>
                  <select
                    id="auth-type"
                    name="auth-type"
                    autoComplete="auth-type"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>FT</option>
                    <option>NFT</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="nft-id" className="block text-sm font-medium text-gray-700">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  />
                </div>
              </div>
            </div>
            <div className="m-4 ml-4 p-2">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="About Me ..type"
                  // defaultValue={''}
                />
              </div>
              {/* <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p> */}
            </div>
              
            <div>
            <Gateway /> 
            </div>  

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                onClick={handleHomeClick}
                className="inline-flex mr-2 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Back To Home
              </button>
              <button
                type="submit"
                onClick={handleClickForSubmit}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
