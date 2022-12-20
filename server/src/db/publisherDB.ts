import { PublisherInterface } from 'src/utils/interfaces';
import { publisherModel } from './publisherModel';

export const findPublisherByHash = (tempHash: string) => {
  return new Promise((resolve, reject) => {
    const dbresult = resolve(publisherModel.findOne({ authorHash: tempHash }));
    return dbresult;
  });
};

export const savePublisher = (
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
  return new Promise((resolve, reject) => {
    const dbresult = resolve(
      new publisherModel({
        authorName: authorName,
        authorAddrs: authorAddrs,
        ftAddrs: ftAddrs,
        nftAddrs: nftAddrs,
        authorHash: authorHash,
        chainId: chainId,
        chainName: chainName,
        nftToken: nftToken,
        tag: tag,
        about: about,
      }).save()
    );
    return dbresult;
  });
};

export const saveTextInDb = (tempHash: string, text: string) => {
  return new Promise((resolve, reject) => {
    const dbresult = resolve(publisherModel.findOneAndUpdate({ authorHash: tempHash }, { $push: { picArr: [text] } }));
    return dbresult;
  });
};

export const saveUserInPub = (userHash: string, pubHash: string) => {
  return new Promise((resolve, reject) => {
    const dbresult = resolve(
      publisherModel.findOneAndUpdate({ authorHash: pubHash }, { $push: { subsArr: [userHash] } })
    );
    return dbresult;
  });
};

export const retrieveAllAuhtors = () => {
  return new Promise((resolve, reject) => {
    const dbResult = resolve(publisherModel.find());
  });
};
