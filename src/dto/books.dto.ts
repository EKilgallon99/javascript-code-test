export interface BookByAuthorDto {
  book: {
    title: string;
    author: string;
    isbn: string;
  };
  stock: {
    quantity: string;
    price: string;
  };
}
