import { Book, FormatType } from './types/books.types';
import { APIBasePath } from './api';
import {
  BookSellerExampleBookFromXml,
  BookSellerExampleDto,
  BookSellerExampleXMLJsonDto,
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
import { useHttpRequest } from './useHttpRequest';
import { MethodType, QueryParams } from './types/request.types';

export class BookSearchApiClient {
  format: string;
  basePath: string;

  constructor(format: string, basePath?: string) {
    this.format = format;
    this.basePath = basePath ? basePath : 'http://api.book-seller-example.com';
  }

  private async getBookByQuery(
    queryParams: QueryParams[],
    path: string,
  ): Promise<Book[] | undefined> {
    return useHttpRequest(MethodType.GET, path, queryParams, this.basePath)
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
                (item: BookSellerExampleXMLJsonDto) => {
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
    let path = '';
    let queryParameters: QueryParams[] = [];
    if (this.basePath === APIBasePath.Book_Seller_Example) {
      const requestInfo = getAuthorPathAndQP(authorName, limit, this.format);

      path = requestInfo.path;
      queryParameters = requestInfo.queryParameters;
    } else {
      throw new Error(`Unknown base path: ${this.basePath}`);
    }

    return this.getBookByQuery(queryParameters, path);
  }

  getBooksByPublisher(
    publisherName: string,
    limit: number = 10,
  ): Promise<Book[] | undefined> | undefined {
    let path = '';
    let queryParameters: QueryParams[] = [];
    if (this.basePath === APIBasePath.Book_Seller_Example) {
      const requestInfo = getPublisherPathAndQP(
        publisherName,
        limit,
        this.format,
      );

      path = requestInfo.path;
      queryParameters = requestInfo.queryParameters;
    } else {
      throw new Error(`Unknown base path: ${this.basePath}`);
    }

    return this.getBookByQuery(queryParameters, path);
  }

  getBookByYearPublished(
    yearPublished: string,
    limit: number = 10,
  ): Promise<Book[] | undefined> | undefined {
    let path = '';
    let queryParameters: QueryParams[] = [];

    if (this.basePath === APIBasePath.Book_Seller_Example) {
      const requestInfo = getYearPublishedPathAndQP(
        yearPublished,
        limit,
        this.format,
      );

      path = requestInfo.path;
      queryParameters = requestInfo.queryParameters;
    } else {
      throw new Error(`Unknown base path: ${this.basePath}`);
    }

    return this.getBookByQuery(queryParameters, path);
  }
}
