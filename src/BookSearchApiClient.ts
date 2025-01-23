import {
  BookByAuthor,
  FormatType,
  methodType,
  QueryParams,
} from '../types/books.types';
import {
  BookByAuthorDto,
  BookByAuthorFromXml,
  BookByAuthorXMLJson,
} from './dto/books.dto';
import {
  BookFromJsonTransformer,
  BookFromXMLJsonTransformer,
} from './utils/books.utils';
import { XMLJSONFromString } from './utils/xml.utils';

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

  getBooksByAuthor(
    authorName: string,
    limit: number = 10,
  ): Promise<BookByAuthor[] | undefined> {
    const result = this.useHttpRequest(methodType.GET, 'by-author', [
      { key: 'q', value: authorName },
      { key: 'limit', value: limit.toString() },
      { key: 'format', value: this.format },
    ])
      .then(async (res: Response) => {
          switch (this.format) {
            case FormatType.JSON:
              const json = await res.json();
              const parsedJson: BookByAuthorDto[] = JSON.parse(json);
              return parsedJson.map((item: BookByAuthorDto) => {
                return BookFromJsonTransformer(item);
              });
            case FormatType.XML:
              const textResponse = await res.text();
              const XMLasJson: BookByAuthorFromXml =
                await XMLJSONFromString(textResponse);
              return XMLasJson.document.children.map(
                (item: BookByAuthorXMLJson) => {
                  return BookFromXMLJsonTransformer(item);
                },
              );

            default:
              throw new Error(`Unexpected format: ${this.format}`);
          }
      })
      .catch((e) => {
        throw new Error(
          `Failed to get books by author from ${this.basePath}: ${e}`,
        );
      });

    return result;
  }
}
