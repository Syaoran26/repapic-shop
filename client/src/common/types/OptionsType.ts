interface Options<T = any> {
  search?: string;
  sort?: string[];
  page?: number;
  limit?: number;
  filter: T;
}

export default Options;
