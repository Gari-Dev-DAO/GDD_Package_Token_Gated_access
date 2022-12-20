//7RBjFJHHnqw5wLZ4k9FkSgMWjhBVDf6ZKqoLgAUTcB8F
export const hashForAddrs = (addrs: string, flag: boolean): string => {
  let stringSlice = addrs.slice(11, 22);
  let finalString = '';
  if (flag) {
    finalString = stringSlice + 'pub';
  } else {
    finalString = stringSlice + 'sub';
  }
  stringSlice = '';
  return finalString;
};
