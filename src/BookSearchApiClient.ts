import {
  BookByAuthor,
  FormatType,
  methodType,
  QueryParams,
} from '../types/books.types';
import { BookByAuthorDto } from './dto/books.dto';
import {
  BookFromJsonTransformer,
  BookFromXMLTransformer,
} from './utils/books.utils';
import { ArrayFromChildNodes, XMLFromString } from './utils/xml.utils';

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
        if (res.status === 200) {
          switch (this.format) {
            case FormatType.JSON:
              const json = await res.json();
              const parsedJson: BookByAuthorDto[] = JSON.parse(json);
              return parsedJson.map((item: BookByAuthorDto) => {
                return BookFromJsonTransformer(item);
              });
            case FormatType.XML:
              const textResponse = await res.text();
              const childNodesArray = ArrayFromChildNodes(
                XMLFromString(textResponse),
              );

              return childNodesArray.map((item: ChildNode) => {
                return BookFromXMLTransformer(item);
              });

            default:
              throw new Error(`Unexpected format: ${this.format}`);
          }
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
