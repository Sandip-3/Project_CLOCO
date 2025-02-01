export interface UserLoginData {
  email: string;
  password: string;
}

export interface AdminLoginData {
  email: string;
  username?: string;
  password: string;
}

export interface UserInfo {
  id: number;
  username?: string;
  email: string;
  role: string;
  name: string;
}
