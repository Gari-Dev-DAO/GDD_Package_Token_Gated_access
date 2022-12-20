import { NextFunction, Request, Response } from 'express';
import { addPublisherService, getAllAuthors, isValidAuthor, savePublisherText } from 'src/services/newPublisher';
import { PublisherInterface, PublisherResponse } from 'src/utils/interfaces';
import { checkOnlyPub, publisherAddTextSchema, publisherSchema } from 'src/utils/zodSchema';

/**
 *
 * @param req body contains new authorName, ftaddress, nftaddress and authoraddress, addresses are web3 addrs
 * @param res standard response of status and message
 * @param next
 */
export const addNewPublisher = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { success } = await publisherSchema.safeParseAsync(req.body.data);
  if (!success) {
    res.status(400).send({ response: 'Invalid Body' }).end();
  }
  // todo the programm flows still from here! so need to check.
  try {
    // const { success } = await publisherSchema.safeParseAsync(req.body);
    // if (!success) {
    //   res.status(400).send({ response: 'Invalid Body' }).end();
    // } else {
    const { authorName, ftAddrs, nftAddrs, authorAddrs, chainId, chainName, nftToken, tag, about } = req.body.data;
    console.log(authorName);
    //todo here check if the authorId already there.
    // const result = isValidAuthor(authorAddrs);
    const result = await addPublisherService(
      authorName,
      ftAddrs,
      nftAddrs,
      authorAddrs,
      chainId,
      chainName,
      nftToken,
      tag,
      about
    );
    console.log('I am result' + result);
    if (result === false) {
      res.status(200).send({ msg: 'Registered as Author' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Error while new author register' });
  }
};
export const checkForPub = async (req: Request, res: Response, next: NextFunction) => {
  const { success } = await checkOnlyPub.safeParseAsync(req.body.data);
  if (!success) {
    res.status(400).send({ response: 'Invalid Body' }).end();
  }
  const { authorAddrs } = req.body.data;
  const result = await isValidAuthor(authorAddrs);
  res.send({ response: result });
};
/**
 *
 * @param req authorAddrs, text
 * @param res standard response of status and message with bool flag
 * @param next
 */
export const publisherAddText = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { success } = await publisherAddTextSchema.safeParseAsync(req.body.data);
    if (!success) {
      res.status(400).send({ response: 'Invalid Body' });
    } else {
      const { authorAddrs, text } = req.body.data;
      const result = await isValidAuthor(authorAddrs);
      if (result) {
        const result = await savePublisherText(authorAddrs, text);
        console.log(result);
        res.status(200).send({ response: 'Good Body' });
      } else {
        res.status(400).send({ response: 'You are not registered as Author' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ response: 'Error while adding Post' });
  }
};
/**
 *
 * @param req authorAddrs, picture
 * @param res standard response of status and message with bool flag
 * @param next
 */
export const publisherAddPicture = async (req: Request, res: Response, next: NextFunction) => {};

/**
 *
 * @param req authorAddrs, video processing file to be define
 * @param res
 * @param next
 */
export const publisherAddVideo = async (req: Request, res: Response, next: NextFunction) => {};

export const getAllPublishersDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const respponse = (await getAllAuthors()) as unknown as Array<PublisherInterface>;
    if (respponse) {
      console.log(respponse);
      const result = transformData(respponse);
      res.status(200).send({ data: result });
    } else {
      res.status(400).send({ msg: 'Not any authors' });
    }
  } catch (error) {
    res.status(503).send({ msg: 'Internal Server Error' });
  }
};

const transformData = (dbResponse: Array<PublisherInterface>): any => {
  let filterResponse: PublisherResponse = {
    authorAddrs: '',
    chainId: '',
    chainName: '',
    ftAddrs: '',
    nftAddrs: '',
    nftToken: '',
    tag: '',
    authorName: '',
    about: '',
  };
  const tempArr = [];
  for (const singlePubData of dbResponse) {
    (filterResponse.authorAddrs = singlePubData.authorAddrs),
      (filterResponse.chainId = singlePubData.chainId!),
      (filterResponse.authorName = singlePubData.authorName),
      (filterResponse.chainName = singlePubData.chainName!),
      (filterResponse.ftAddrs = singlePubData.ftAddrs),
      (filterResponse.nftAddrs = singlePubData.nftAddrs),
      (filterResponse.nftToken = singlePubData.nftToken),
      (filterResponse.tag = singlePubData.tag);
    filterResponse.about = singlePubData.about;
    tempArr.push(filterResponse);
    filterResponse = {
      authorAddrs: '',
      chainId: '',
      chainName: '',
      ftAddrs: '',
      nftAddrs: '',
      nftToken: '',
      tag: '',
      authorName: '',
      about: '',
    };
  }
  return tempArr;
};
