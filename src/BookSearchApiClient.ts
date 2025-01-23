import {
  Book,
  FormatType,
  methodType,
  QueryParams,
} from '../types/books.types';
import { APIBasePath } from './api';
import {
  BookSellerExampleBookFromXml,
  BookSellerExampleDto,
  BookSellerExampleXMLJson,
} from './book-seller-example/dto/bookSellerExample.dto';
import {
  BookFromBookSellerExampleJsonTransformer,
  BookFromBookSellerExampleXMLJsonTransformer,
} from './book-seller-example/bookSellerExample.transformer';
import { XMLJSONFromString } from './utils/xml.utils';
import {
  getAuthorPathAndQP,
  getPublisherPathAndQP,
  getYearPublishedPathAndQP,
} from './book-seller-example/bookSellerExample';

export class BookSearchApiClient {
  format: string;
  basePath: string;

  constructor(format: string, basePath?: string) {
    this.format = format;
    this.basePath = basePath ? basePath : 'http://api.book-seller-example.com';
  }

  private async useHttpRequest(
    method: methodType,
    path: string,
    queryParams: QueryParams[],
  ): Promise<Response> {
    const qpString = queryParams
      .map((qp) => {
        return `${qp.key}=${qp.value}`;
      })
      .join('&');

    return await fetch(`${this.basePath}/${path}?${qpString}`, {
      method: method,
    })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw new Error(`Fetch failed: ${e}`);
      });
  }

  private async getBookByQuery(
    queryParams: QueryParams[],
    path: string,
  ): Promise<Book[] | undefined> {
    return this.useHttpRequest(methodType.GET, path, queryParams)
      .then(async (res: Response) => {
        switch (this.format) {
          case FormatType.JSON:
            const json = await res.json();
            if (this.basePath === APIBasePath.Book_Seller_Example) {
              const parsedJson: BookSellerExampleDto[] = JSON.parse(json);
              return parsedJson.map((item: BookSellerExampleDto) => {
                return BookFromBookSellerExampleJsonTransformer(item);
              });
            } else {
              return undefined;
            }

          case FormatType.XML:
            const textResponse = await res.text();
            if (this.basePath === APIBasePath.Book_Seller_Example) {
              const XMLasJson: BookSellerExampleBookFromXml =
                await XMLJSONFromString(textResponse);
              return XMLasJson.document.children.map(
                (item: BookSellerExampleXMLJson) => {
                  return BookFromBookSellerExampleXMLJsonTransformer(item);
                },
              );
            } else {
              return undefined;
            }
          default:
            throw new Error(`Unexpected format: ${this.format}`);
        }
      })
      .catch((e) => {
        throw new Error(
          `Failed to get books by author from ${this.basePath}: ${e}`,
        );
      });
  }

  getBooksByAuthor(
    authorName: string,
    limit: number = 10,
  ): Promise<Book[] | undefined> | undefined {
    if (this.basePath === APIBasePath.Book_Seller_Example) {
      const requestInfo = getAuthorPathAndQP(authorName, limit, this.format);
      return this.getBookByQuery(requestInfo.queryParams, requestInfo.path);
    } else {
      return undefined;
    }
  }

  getBooksByPublisher(
    publisherName: string,
    limit: number = 10,
  ): Promise<Book[] | undefined> | undefined {
    if (this.basePath === APIBasePath.Book_Seller_Example) {
      const requestInfo = getPublisherPathAndQP(
        publisherName,
        limit,
        this.format,
      );

      return this.getBookByQuery(requestInfo.queryParameters, requestInfo.path);
    } else {
      return undefined;
    }
  }

  getBookByYearPublished(
    yearPublished: string,
    limit: number = 10,
  ): Promise<Book[] | undefined> | undefined {
    if (this.basePath === APIBasePath.Book_Seller_Example) {
      const requestInfo = getYearPublishedPathAndQP(
        yearPublished,
        limit,
        this.format,
      );

      return this.getBookByQuery(requestInfo.queryParameters, requestInfo.path);
    } else {
      return undefined;
    }
  }
}
