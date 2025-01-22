import { BookSearchApiClient } from './BookSearchApiClient.ts';

const client = new BookSearchApiClient('json');

const booksByShakespeare = await client.getBooksByAuthor('Shakespeare', 10);
