export enum methodType {
  GET = 'GET',
}

export enum FormatType {
  JSON = 'json',
  XML = 'xml',
}

export interface BookByAuthor {
  title: string;
  author: string;
  isbn: string;
  quantity: string;
  price: string;
}

export interface QueryParams {
  key: string;
  value: string;
}
