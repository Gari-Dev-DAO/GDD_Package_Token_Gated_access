import { NextFunction, Request, Response } from 'express';
import { getPublisherByHash, isValidAuthor } from 'src/services/newPublisher';
import { addNewSubs, getUserContent } from 'src/services/newUser';
import { SubscriberAuthentication } from 'src/services/subAuthentication';
import { PublisherInterface } from 'src/utils/interfaces';
import { EvmApi, SolApi } from 'src/utils/web3';
import { subscriberSchema } from 'src/utils/zodSchema';
const URI_MAIN_NET = process.env.SOL_URI_DEV_NET as string;
const POL = process.env.POL_URI_MAIN_NET as string;
// const eth = process.env.EVM_URI_MAIN_NET as string;
export const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { success } = await subscriberSchema.safeParseAsync(req.body.data);
    if (!success) {
      res.status(400).send({ response: 'Invalid body' }).end();
    }
    const { userAddrs, pubAddr } = req.body.data;
    console.log(userAddrs);
    console.log(pubAddr);
    const dbResult = await isValidAuthor(pubAddr);
    console.log(dbResult);
    if (dbResult) {
      const publisherData: PublisherInterface = await getPublisherByHash(pubAddr);
      const getResponseFromHere = await subscriberAuthentication(publisherData, pubAddr, userAddrs);
      console.log(getResponseFromHere);
      if (getResponseFromHere) {
        await addNewSubs(pubAddr, userAddrs);
        // todo the content must be fetched again
        const publisherDataTwo: PublisherInterface = await getPublisherByHash(pubAddr);
        const result = getUserContent(publisherDataTwo, userAddrs);
        //todo check for the data execptions.
        res.status(200).send({ response: { msg: 'You just subscribed', data: result, status: 200 } });
      } else {
        // todo check the diff
        res.send({ response: 'You dont hold any ft/nft specified by Author', status: 400 });
      }
    } else {
      res.status(400).send({ response: 'Author Not Registered' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ response: 'Error while adding new user' });
  }
};

const subscriberAuthentication = async (
  publisherData: PublisherInterface,
  pubAddr: string,
  subAddr: string
  // chainId?: string
) => {
  const { chainName, nftAddrs, nftToken, tag, chainId } = publisherData;
  console.log(chainId);
  const EvmInstance = new EvmApi(POL, subAddr, nftAddrs, nftToken);
  const solInstance = new SolApi(URI_MAIN_NET, subAddr, nftAddrs);
  const authInstance = new SubscriberAuthentication(solInstance, EvmInstance);
  if (chainName === 'Solana') {
    return await (tag === 'nft' ? authInstance.checkNfts(0) : authInstance.checkBalance(0));
  } else if (chainName === 'Polygon' || chainName === 'POL-MAIN-NET') {
    return await (tag === 'nft' ? authInstance.checkNfts(1) : authInstance.checkBalance(1));
  }
};

export const getAllDataForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { success } = await subscriberSchema.safeParseAsync(req.body);
    if (!success) {
      res.status(400).send({ response: 'Invalid body' }).end();
    }
    const { userAddrs, pubAddr } = req.body;
    const dbResult = await isValidAuthor(pubAddr);
    if (dbResult) {
      const publisherData: PublisherInterface = await getPublisherByHash(pubAddr);
      const result = getUserContent(publisherData, userAddrs);
      res.status(200).send({ response: result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ response: 'Error while fetching the user intended content' });
  }
};
