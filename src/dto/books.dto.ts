export interface BookByAuthorDto {
  book: {
    title: string;
    author: string;
    isbn: number;
  };
  stock: {
    quantity: number;
    price: number;
  };
}
