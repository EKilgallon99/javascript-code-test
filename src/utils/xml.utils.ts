import { parseStringPromise } from 'xml2js';

export const XMLJSONFromString = async (data: string) => {
  const value = await parseStringPromise(data);
  return value;
};
