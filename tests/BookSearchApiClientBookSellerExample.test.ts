import { BookSearchApiClient } from '../src/BookSearchApiClient.ts';
import { mockBooksXML, mockBooksJSON, mockTransformedBooks } from './consts.ts';
import { APIBasePath } from '../src/api.ts';

describe('Book Search API CLient - book_seller_example', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call the default api when base path is not passed into constructor', async () => {
    const client = new BookSearchApiClient('json');
    expect(client.basePath).toEqual('http://api.book-seller-example.com');
  });

  it('Should get books by query - JSON format', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(JSON.stringify(mockBooksJSON)),
        status: 200,
      }),
    ) as jest.Mock;

    const client = new BookSearchApiClient(
      'json',
      APIBasePath.Book_Seller_Example,
    );
    const res = await client.getBooksByAuthor('Shakespeare', 10);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.book-seller-example.com/by-author?q=Shakespeare&limit=10&format=json',
      { method: 'GET' },
    );
    expect(res).toEqual(mockTransformedBooks);
  });

  it('Should get books by query - XML format', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockBooksXML),
        status: 200,
      }),
    ) as jest.Mock;

    const client = new BookSearchApiClient(
      'xml',
      APIBasePath.Book_Seller_Example,
    );
    const res = await client.getBooksByAuthor('Shakespeare', 10);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api.book-seller-example.com/by-author?q=Shakespeare&limit=10&format=xml',
      { method: 'GET' },
    );

    expect(res).toEqual(mockTransformedBooks);
  });

  it('Should throw the correct error for unexpected formats', async () => {
    const client = new BookSearchApiClient(
      'csv',
      APIBasePath.Book_Seller_Example,
    );
    await expect(client.getBooksByAuthor('Shakespeare', 10)).rejects.toThrow(
      new Error(
        'Failed to get books by author from http://api.book-seller-example.com: Error: Unexpected format: csv',
      ),
    );
  });

  it('Should throw the correct error for failed fetch API calls', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error())) as jest.Mock;
    const client = new BookSearchApiClient(
      'json',
      APIBasePath.Book_Seller_Example,
    );
    await expect(client.getBooksByAuthor('Shakespeare', 10)).rejects.toThrow(
      new Error(
        'Failed to get books by author from http://api.book-seller-example.com: Error: Fetch failed: Error',
      ),
    );
  });

  it('Should handle an unknown base path', async () => {
    const client = new BookSearchApiClient(
      'json',
      'http://api.incorrect-base-path.com',
    );

    expect(
      async () => await client.getBooksByAuthor('Shakespeare', 10),
    ).rejects.toThrow('Unknown base path: http://api.incorrect-base-path.com');
  });
});
