interface Product {
  _id: string;
  title: string;
  thumbnail: string;
  images: string[];
  stock: number;
  price: number;
  slug: string;
  rating?: number;
  description?: string;
  discount?: number;
}

export default Product;
