import mongoose from 'mongoose';
import { PublisherInterface } from 'src/utils/interfaces';

const publisherSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  ftAddrs: { type: String },
  authorAddrs: { type: String, required: true },
  nftAddrs: { type: String },
  authorHash: { type: String, required: true, unique: true },
  picArr: [{ type: String }],
  subsArr: [{ type: String }],
  chainId: { type: String },
  chainName: { type: String },
  nftToken: { type: String },
  tag: { type: String },
  about: { type: String },
});

export const publisherModel = mongoose.model('Publisher', publisherSchema)<PublisherInterface>;
