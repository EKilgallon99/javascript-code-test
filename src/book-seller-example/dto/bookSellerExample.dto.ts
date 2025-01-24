export interface BookSellerExampleDto {
  book: {
    title: string;
    isbn: string;
    author?: string;
    publisher?: string;
    yearPubished?: string;
  };
  stock: {
    quantity: string;
    price: string;
  };
}

export interface BookSellerExampleXMLJsonDto {
  book: BookSellerExampleXMlJson[];
  stock: BookSellerExampleStockXMLJson[];
}

interface BookSellerExampleXMlJson {
  title: string[];
  isbn: string[];
  author?: string[];
  publisher?: string;
  yearPubished?: string;
}

interface BookSellerExampleStockXMLJson {
  quantity: string[];
  price: string[];
}

export interface BookSellerExampleBookFromXml {
  document: {
    children: BookSellerExampleXMLJsonDto[];
  };
}
