import { MethodType, QueryParams } from './types/request.types';

export const useHttpRequest = async (
  method: MethodType,
  path: string,
  queryParams: QueryParams[],
  basePath: string,
): Promise<Response> => {
  const qpString = queryParams
    .map((qp) => {
      return `${qp.key}=${qp.value}`;
    })
    .join('&');

  return await fetch(`${basePath}/${path}?${qpString}`, {
    method: method,
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      throw new Error(`Fetch failed: ${e}`);
    });
};
