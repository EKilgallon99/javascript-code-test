import { BookSellerExampleDto } from '../src/book-seller-example/dto/bookSellerExample.dto';
import { Book } from '../src/types/books.types';

export const mockBooksJSON: BookSellerExampleDto[] = [
  {
    book: {
      title: 'Romeo and Juliet',
      author: 'Shakespeare',
      isbn: '9781844669363',
    },
    stock: {
      quantity: '5',
      price: '9.99',
    },
  },
  {
    book: {
      title: 'Hamlet',
      author: 'Shakespeare',
      isbn: '97818446695673',
    },
    stock: {
      quantity: '9',
      price: '12.99',
    },
  },
];

//need to check this format
export const mockBooksXML: string = `<document><children><book><title>Romeo and Juliet</title><author>Shakespeare</author><isbn>9781844669363</isbn></book><stock><quantity>5</quantity><price>9.99</price></stock></children><children><book><title>Hamlet</title><author>Shakespeare</author><isbn>97818446695673</isbn></book><stock><quantity>9</quantity><price>12.99</price></stock></children></document>`;

export const mockTransformedBooks: Book[] = [
  {
    title: 'Romeo and Juliet',
    author: 'Shakespeare',
    isbn: '9781844669363',
    quantity: '5',
    price: '9.99',
  },
  {
    title: 'Hamlet',
    author: 'Shakespeare',
    isbn: '97818446695673',
    quantity: '9',
    price: '12.99',
  },
];
