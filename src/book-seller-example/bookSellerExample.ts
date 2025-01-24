export const getAuthorPathAndQP = (
  authorName: string,
  limit: number,
  format: string,
) => {
  return {
    path: 'by-author',
    queryParameters: [
      { key: 'q', value: authorName },
      { key: 'limit', value: limit.toString() },
      { key: 'format', value: format },
    ],
  };
};

export const getPublisherPathAndQP = (
  publisherName: string,
  limit: number,
  format: string,
) => {
  return {
    queryParameters: [
      { key: 'q', value: publisherName },
      { key: 'limit', value: limit.toString() },
      { key: 'format', value: format },
    ],
    path: 'by-publisher',
  };
};

export const getYearPublishedPathAndQP = (
  yearPublished: string,
  limit: number,
  format: string,
) => {
  return {
    queryParameters: [
      { key: 'q', value: yearPublished },
      { key: 'limit', value: limit.toString() },
      { key: 'format', value: format },
    ],
    path: 'by-publisher',
  };
};
