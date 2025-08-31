export interface USER {
  id: number;
  order_number: number;
  name: string;
  email: string;
}

export interface ORDER {
  order_number: number;
  order_title: string;
  order_description: string;
}
