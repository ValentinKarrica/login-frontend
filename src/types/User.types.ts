export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  photo?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
}

export interface Credentials {
  user: User;
  token: string;
}
