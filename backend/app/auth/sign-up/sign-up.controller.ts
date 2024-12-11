import { deriveSignUpUser } from './sign-up.deriver';

type SignUpControllerResult =
  | {
      success: true;
      token: string;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export const signUpUser = async ({
  email,
  password,
  rePassword,
}: {
  email: string;
  password: string;
  rePassword: string;
}): Promise<SignUpControllerResult> => {
  const existingUser = undefined; // async get user from a database

  const result = deriveSignUpUser({
    existingUser,
    email,
    password,
    rePassword,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  // create a new user in the database
  const user = {}; // async create user in the database

  // create JWT token for the user
  const jwt = 'xxxxx.yyyyy.zzzzz'; // async create jwt token for the user

  return {
    success: true,
    token: jwt,
    message: 'User created successfully',
  };
};