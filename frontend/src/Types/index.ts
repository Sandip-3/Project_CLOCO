export interface UserLogin {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  username?: string;
  email: string;
  role: string;
  name: string;
}
