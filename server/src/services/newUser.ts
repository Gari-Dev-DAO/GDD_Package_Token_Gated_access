import { saveUserInPub } from 'src/db/publisherDB';
import { hashForAddrs } from 'src/utils/computeHash';
import { PublisherInterface } from 'src/utils/interfaces';
import { isValidAuthor } from './newPublisher';

export const addNewSubs = async (pubAddr: string, userAddrs: string) => {
  const isAuthAuthor = await isValidAuthor(pubAddr);
  if (isAuthAuthor) {
    const userHash = hashForAddrs(userAddrs, false);
    const authorHash = hashForAddrs(pubAddr, true);
    try {
      const dbResponse: any = await saveUserInPub(userHash, authorHash);
      if (dbResponse != null) {
        return { msg: 'User Added Sucessfully' };
      }
    } catch (error) {
      console.log(error);
      return { msg: 'Error during User Addition' };
    }
  } else {
    return { msg: 'Publisher not Registered' };
  }
};

export const getUserContent = (publisherData: PublisherInterface, subAddr: string): boolean | object => {
  const userHash = hashForAddrs(subAddr, false);
  const validSub = isValidSub(publisherData.subsArr!, userHash);
  if (validSub) {
    return { data: publisherData.picArr };
  } else {
    return { data: [] };
  }
};

const isValidSub = (subs: [], subsHash: string): boolean => {
  for (let i = 0; i < subs.length; i++) {
    if (subs[i] === subsHash) {
      return true;
      break;
    }
  }
  return false;
};
