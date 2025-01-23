import exp from 'constants';
import { BookSearchApiClient } from '../src/BookSearchApiClient.ts';
import { mockBooksXML, mockBooksJSON, mockTransformedBooks } from './consts.ts';

describe('Book Search API CLient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should get books by author - JSON format', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(JSON.stringify(mockBooksJSON)),
        status: 200,
      }),
    ) as jest.Mock;

    const client = new BookSearchApiClient('json');
    const res = await client.getBooksByAuthor('Shakespeare', 10);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.book-seller-example.com/by-author?q=Shakespeare&limit=10&format=json',
      { method: 'GET' },
    );
    expect(res).toEqual(mockTransformedBooks);
  });

  it('Should get books by author - XML format', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockBooksXML),
        status: 200,
      }),
    ) as jest.Mock;

    const client = new BookSearchApiClient('xml');
    const res = await client.getBooksByAuthor('Shakespeare', 10);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.book-seller-example.com/by-author?q=Shakespeare&limit=10&format=xml',
      { method: 'GET' },
    );

    expect(res).toEqual(mockTransformedBooks);
  });

  it('Should throw the correct error for unexpected formats', async () => {
    const client = new BookSearchApiClient('csv');
    await expect(client.getBooksByAuthor('Shakespeare', 10)).rejects.toThrow(
      new Error(
        'Failed to get books by author from http://api.book-seller-example.com: Error: Unexpected format: csv',
      ),
    );
  });

  it('Should throw the correct error for failed fetch API calls', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error()),
    ) as jest.Mock;
    const client = new BookSearchApiClient('json');
    await expect(client.getBooksByAuthor('Shakespeare', 10)).rejects.toThrow(
      new Error(
        "Failed to get books by author from http://api.book-seller-example.com: Error: Fetch failed: Error"
      )
    )
  })

});
