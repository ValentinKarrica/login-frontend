export interface UpdatePasswordFields {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface UpdatePasswordTypes {
  updatePasswordFields: UpdatePasswordFields;
  token: string;
}
