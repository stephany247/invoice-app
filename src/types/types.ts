export type Status = "draft" | "pending" | "paid";

export type Item = {
  name: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  id: string;

  fromAddress: string;
  fromCity: string;
  fromPostCode: string;
  fromCountry: string;

  client: string;
  email: string;

  address: string;
  city: string;
  postCode: string;
  country: string;

  createdAt: string;
  dueDate: string;
  paymentTerms: string;
  description: string;

  status: Status;
  items: Item[];
};
