interface User {
  _id: string;
  email: string;
  name: string;
  token: string;
  avatar?: string;
  address?: string;
}

export default User;
