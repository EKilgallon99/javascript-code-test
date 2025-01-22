import { BookByAuthorDto } from '../dto/books.dto';

export const BookFromJsonTransformer = (data: BookByAuthorDto) => {
  return {
    title: data.book.title,
    author: data.book.author,
    isbn: data.book.isbn,
    quantity: data.stock.quantity,
    price: data.stock.price,
  };
};

export const BookFromXMLTransformer = (data: ChildNode) => {
  return {
    title: data.childNodes[0].childNodes[0].nodeValue || '',
    author: data.childNodes[0].childNodes[1].nodeValue || '',
    isbn: data.childNodes[0].childNodes[2].nodeValue || '',
    quantity: data.childNodes[1].childNodes[0].nodeValue || '',
    price: data.childNodes[1].childNodes[1].nodeValue || '',
  };
};
