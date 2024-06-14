export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  image: string;
  image2: string;
  id_cut: number;
  cut?: {
    name: string;
  };
  pivot: {
    quantity: number;
    unit_price: number;
  };
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
  role: string;
}

export type Cut = {
  id: number;
  name: string;
  description: string;
  weight: number;
}

export interface Order {
  id: number;
  date_order: string;
  date_deliver?: string;
  status: 'pendiente' | 'procesando' | 'reparto' | 'entregado' | 'cancelado';
  total_price: number;
  total_products: number;
  id_user: number;
  products: Product[];
  user: User;
}

export interface Review {
  id: string;
  id_product: number;
  id_user: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    name: string;
    surname: string;
    email: string;
    image: string;
  };
}
