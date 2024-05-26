export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  image: string;
  image2: string;
  id_cut: number;
}

export type User = {
  id: number;
  name: string;
  surname: string;
  postal_code: string;
  locality: string;
  province: string;
  street: string;
  number: string;
  floor: string;
  staircase: string;
  image: string;
  phone: string;
  email: string;
  password: string;
}