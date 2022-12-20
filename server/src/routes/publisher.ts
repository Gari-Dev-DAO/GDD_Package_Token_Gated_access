import { Router } from 'express';
const pubRouter: Router = Router();
import {
  addNewPublisher,
  checkForPub,
  getAllPublishersDetails,
  publisherAddPicture,
  publisherAddText,
  publisherAddVideo,
} from 'src/controllers/publisherController';
pubRouter.get('/pubs', getAllPublishersDetails);
pubRouter.post('/add', addNewPublisher);
pubRouter.post('/check', checkForPub);
pubRouter.post('/add/text', publisherAddText);
pubRouter.post('/add/pic', publisherAddPicture);
pubRouter.post('/add/video', publisherAddVideo);
export = pubRouter;
