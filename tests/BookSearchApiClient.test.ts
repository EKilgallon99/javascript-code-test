import { BookSearchApiClient } from '../src/BookSearchApiClient.ts';
import { mockBookJSON, mockBookXML, mockTransformedBook } from './consts.ts';

describe('Book Search API CLient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should get books by author - JSON format', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(JSON.stringify([mockBookJSON])),
        status: 200,
      }),
    ) as jest.Mock;

    const client = new BookSearchApiClient('json');
    const res = await client.getBooksByAuthor('Shakespeare', 10);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.book-seller-example.com/by-author?q=Shakespeare&limit=10&format=json',
      { method: 'GET' },
    );
    expect(res).toEqual([mockTransformedBook]);
  });

  it('Should get books by author - XML format', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve([mockBookXML]),
        status: 200,
      }),
    ) as jest.Mock;

    const client = new BookSearchApiClient('xml');
    const res = await client.getBooksByAuthor('Shakespeare', 10);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.book-seller-example.com/by-author?q=Shakespeare&limit=10&format=xml',
      { method: 'GET' },
    );
    expect(res).toEqual([mockTransformedBook]);
  });
});
