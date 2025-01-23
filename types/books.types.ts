export enum methodType {
  GET = 'GET',
}

export enum FormatType {
  JSON = 'json',
  XML = 'xml',
}

export interface Book {
  title: string;
  isbn: string;
  quantity: string;
  price: string;
  author?: string;
  publisher?: string;
  yearPubished?: string;
}

export interface QueryParams {
  key: string;
  value: string;
}
