import { BookByAuthor, QueryParams } from '../types/books.types';
import { BookByAuthorDto } from './dto/books.dto';
import {
  BookFromJsonTransformer,
  BookFromXMLTransformer,
} from './utils/books.utils';
import { ArrayFromChildNodes, XMLFromString } from './utils/xml.utils';

enum methodType {
  GET = 'GET',
}

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
    });
  }

  getBooksByAuthor(
    authorName: string,
    limit: number = 10,
  ): Promise<BookByAuthor[]> {
    const result = this.useHttpRequest(methodType.GET, 'by-author', [
      { key: 'q', value: authorName },
      { key: 'limit', value: limit.toString() },
      { key: 'format', value: this.format },
    ])
      .then(async (res: Response) => {
        if (res.status === 200) {
          switch (this.format) {
            case 'json':
              const json = await res.json();
              return json.map((item: BookByAuthorDto) => {
                return BookFromJsonTransformer(item);
              });
            case 'xml':
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
          `Failed to get books by author from api.book-seller-example.com: ${e}`,
        );
      });

    return result;
  }
}
