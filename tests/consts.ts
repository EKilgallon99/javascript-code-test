import { BookByAuthorDto } from '../src/dto/books.dto';
import { BookByAuthor } from '../types/books.types';

export const mockBookJSON: BookByAuthorDto = {
  book: {
    title: 'Romeo and Juliet',
    author: 'Shakespeare',
    isbn: '9781844669363',
  },
  stock: {
    quantity: '5',
    price: '9.99',
  },
};

//need to check this format
export const mockBookXML: string = `<book><<title>Romeo and Juliet</title><author>Shakespeare</author><isbn>9781844669363</isbn></book><stock><quantity>5</quantity><price>9.99</price></stock>`;

export const mockTransformedBook: BookByAuthor = {
  title: 'Romeo and Juliet',
  author: 'Shakespeare',
  isbn: '9781844669363',
  quantity: '5',
  price: '9.99',
};
