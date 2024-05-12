interface Product {
  _id: string;
  title: string;
  thumbnail: string;
  stock: number;
  price: number;
  rating?: number;
  description?: string;
  discount?: number;
}

export default Product;
