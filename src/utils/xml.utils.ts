export const XMLFromString = (data: string) => {
  const parser = new DOMParser();
  return parser.parseFromString(data, 'application/xml');
};

export const ArrayFromChildNodes = (xml: Document) => {
  return Array.from(xml.documentElement.childNodes);
};
