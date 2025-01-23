import {
  BookSellerExampleDto,
  BookSellerExampleXMLJson,
} from './dto/bookSellerExample.dto';

export const BookFromBookSellerExampleJsonTransformer = (
  data: BookSellerExampleDto,
) => {
  return {
    title: data.book.title,
    author: data.book.author,
    isbn: data.book.isbn,
    quantity: data.stock.quantity,
    price: data.stock.price,
  };
};

export const BookFromBookSellerExampleXMLJsonTransformer = (
  data: BookSellerExampleXMLJson,
) => {
  return {
    title: data.book[0].title[0],
    isbn: data.book[0].isbn[0],
    quantity: data.stock[0].quantity[0],
    price: data.stock[0].price[0],
    author: data.book[0].author ? data.book[0].author[0] : undefined,
    publisher: data.book[0].publisher ? data.book[0].publisher[0] : undefined,
    yearPublished: data.book[0].yearPubished
      ? data.book[0].yearPubished[0]
      : undefined,
  };
};
