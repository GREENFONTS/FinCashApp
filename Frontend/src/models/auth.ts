export interface Auth {
  token: string | null;
  user: UserModel | null;
  expiryDate: string | null;
  isLoading: boolean;
  error: string | null;
  authenticated: boolean;
  monoKey: string | null;
}

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
