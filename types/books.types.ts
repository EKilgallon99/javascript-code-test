export interface BookByAuthor {
  title: string;
  author: string;
  isbn: number;
  quantity: number;
  price: number;
}

export interface QueryParams {
  key: string;
  value: string;
}
