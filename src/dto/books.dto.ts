export interface BookByAuthorDto {
  book: {
    title: string;
    author: string;
    isbn: string;
  };
  stock: {
    quantity: string;
    price: string;
  };
}

export interface BookByAuthorXMLJson {
  book: BookXMlJson[];
  stock: StockXMLJson[];
}

interface BookXMlJson {
  title: string[];
  author: string[];
  isbn: string[];
}

interface StockXMLJson {
  quantity: string[];
  price: string[];
}

export interface BookByAuthorFromXml {
  document: {
    children: BookByAuthorXMLJson[];
  };
}
