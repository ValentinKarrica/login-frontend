export interface SignUpFormFields {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}


export interface SignUpError {
  message: string;
}