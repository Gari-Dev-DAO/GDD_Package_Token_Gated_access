import { z } from 'zod';

export const publisherSchema = z.object({
  authorName: z.string(),
  ftAddrs: z.string().trim(),
  nftAddrs: z.string().trim(),
  authorAddrs: z.string().trim(),
  chainId: z.string().trim(),
  chainName: z.string().trim(),
  nftToken: z.string().trim(),
  tag: z.string().trim(),
  about: z.string().trim(),
});

export const publisherAddTextSchema = z.object({
  authorAddrs: z.string().trim(),
  text: z.string(),
});

export const subscriberSchema = z.object({
  userAddrs: z.string().trim(),
  pubAddr: z.string().trim(),
});

export const checkOnlyPub = z.object({
  authorAddrs: z.string().trim(),
});
