export interface CreateUserInput {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}
