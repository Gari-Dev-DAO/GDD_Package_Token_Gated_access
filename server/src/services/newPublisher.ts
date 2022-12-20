import { hashForAddrs } from 'src/utils/computeHash';
import { findPublisherByHash, retrieveAllAuhtors, savePublisher, saveTextInDb } from 'src/db/publisherDB';
import { MongooseError } from 'mongoose';
import { PublisherInterface } from 'src/utils/interfaces';

export const addPublisherService = async (
  authorName: string,
  ftAddrs: string,
  nftAddrs: string,
  authorAddrs: string,
  chainId: string,
  chainName: string,
  nftToken: string,
  tag: string,
  about: string
): Promise<any> => {
  const tempHash = hashForAddrs(authorAddrs, true);
  const dbResponse = await isValidAuthor(authorAddrs);
  if (dbResponse === true) {
    return { flag: false, response: dbResponse };
  } else {
    return await saveNewPublisher(
      authorName,
      ftAddrs,
      nftAddrs,
      authorAddrs,
      tempHash,
      chainId,
      chainName,
      nftToken,
      tag,
      about
    );
  }
};

export const isValidAuthor = async (authorAddrs: string): Promise<boolean> => {
  const tempHash = hashForAddrs(authorAddrs, true);
  const dbResponse: any = await findPublisherByHash(tempHash);
  if (dbResponse == null) {
    return false;
  } else {
    return true;
  }
};
export const getPublisherByHash = async (authorAddrs: string): Promise<PublisherInterface> => {
  const tempHash = hashForAddrs(authorAddrs, true);
  const dbResponse: any = await findPublisherByHash(tempHash);
  return dbResponse;
};

const saveNewPublisher = async (
  authorName: string,
  ftAddrs: string,
  nftAddrs: string,
  authorAddrs: string,
  authorHash: string,
  chainId: string,
  chainName: string,
  nftToken: string,
  tag: string,
  about: string
) => {
  const dbResponse = await savePublisher(
    authorName,
    ftAddrs,
    nftAddrs,
    authorAddrs,
    authorHash,
    chainId,
    chainName,
    nftToken,
    tag,
    about
  );
  if (dbResponse != null) {
    return false;
  }
  console.log(dbResponse);
  return dbResponse;
};

export const savePublisherText = async (authorAddrs: string, textToSave: string) => {
  const tempHash = hashForAddrs(authorAddrs, true);
  const dbResponse = saveTextInDb(tempHash, textToSave);
  return dbResponse;
};

export const getAllAuthors = async () => {
  const dbResponse = retrieveAllAuhtors();
  return dbResponse;
};
