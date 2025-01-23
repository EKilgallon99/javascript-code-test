import { BookByAuthorDto, BookByAuthorXMLJson } from '../dto/books.dto';

export const BookFromJsonTransformer = (data: BookByAuthorDto) => {
  return {
    title: data.book.title,
    author: data.book.author,
    isbn: data.book.isbn,
    quantity: data.stock.quantity,
    price: data.stock.price,
  };
};

export const BookFromXMLJsonTransformer = (data: BookByAuthorXMLJson) => {
  return {
    title: data.book[0].title[0],
    author: data.book[0].author[0],
    isbn: data.book[0].isbn[0],
    quantity: data.stock[0].quantity[0],
    price: data.stock[0].price[0],
  };
};
