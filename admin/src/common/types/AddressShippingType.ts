interface AddressShipping {
  _id: string;
  name: string;
  isHome: boolean;
  phone: string;
  address: {
    ward?: string;
    district: string;
    city: string;
    detail?: string;
    street: string;
  };
}

export default AddressShipping;
