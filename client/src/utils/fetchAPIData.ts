import axios from 'axios';
import { PublisherResponse } from './interfaces';
// import dotenv from 'dotenv';
// dotenv.config();
export const someFunction = () => {};
export const getAllPubs = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/pub/pubs');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Throwing error');
    } else {
      console.log('Error while fetching data');
    }
  }
};

export const saveTheNewPub = async (formData: PublisherResponse) => {
  const makeData = {
    authorName: formData.authorName,
    ftAddrs: formData.ftAddrs,
    nftAddrs: formData.nftAddrs,
    authorAddrs: formData.authorAddrs,
    nftToken: formData.nftToken,
    chainId: formData.chainId,
    chainName: formData.chainName,
    tag: formData.tag,
    about: formData.about,
  };
  try {
    const { data } = await axios.post('http://localhost:4000/api/pub/add', { data: makeData });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Throwing error');
    } else {
      console.log('Error while fetching data');
    }
  }
};

export const subToPub = async (authorAddrs: string, usrAddrs: string) => {
  const makeData = {
    userAddrs: usrAddrs,
    pubAddr: authorAddrs,
  };
  try {
    const { data, status } = await axios.post('http://localhost:4000/api/sub/add', { data: makeData });
    console.log(status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Throwing error');
    } else {
      console.log('Error while fetching data');
    }
  }
};

export const checkForAuthorExist = async (authorAddr: string) => {
  const makeData = {
    authorAddrs: authorAddr,
  };
  try {
    const { data, status } = await axios.post('http://localhost:4000/api/pub/check', { data: makeData });
    console.log(status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Throwing error');
    } else {
      console.log('Error while fetching data');
    }
  }
};

export const uploadData = async (authorAddr: string, textData: string) => {
  const makeData = {
    authorAddrs: authorAddr,
    text: textData,
  };
  try {
    const { data, status } = await axios.post('http://localhost:4000/api/pub/add/text', { data: makeData });
    console.log(status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Throwing error');
    } else {
      console.log('Error while fetching data');
    }
  }
};

export const userContent = async (usrAddrs: string, pubAddr: string) => {
  const makeData = {
    userAddrs: usrAddrs,
    pubAddr: pubAddr,
  };
  try {
    const { data, status } = await axios.post('http://localhost:4000/api/sub/my', { data: makeData });
    console.log(status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Throwing error');
    } else {
      console.log('Error while fetching data');
    }
  }
};
