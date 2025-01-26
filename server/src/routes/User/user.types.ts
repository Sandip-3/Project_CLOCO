export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
  gender: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Users {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone: string;
  dob: Date;
  gender: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}
