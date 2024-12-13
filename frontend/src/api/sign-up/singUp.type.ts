export type SignUpResponse = {
  message: string;
  errors?: {
    email?: string;
    password?: string;
    rePassword?: string;
  };
};
