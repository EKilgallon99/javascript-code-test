import { APIBasePath } from './api.ts';
import { BookSearchApiClient } from './BookSearchApiClient.ts';

const client = new BookSearchApiClient('json', APIBasePath.Book_Seller_Example);

const booksByShakespeare = await client.getBooksByAuthor('Shakespeare', 10);
console.log(booksByShakespeare);

const booksFromPengiunBooks = await client.getBooksByPublisher(
  'PenguinBooks',
  10,
);
console.log(booksFromPengiunBooks);

const booksFromToday = await client.getBookByYearPublished('2023', 10);
console.log(booksFromToday);
