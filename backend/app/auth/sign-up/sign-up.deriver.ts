export type SignUpUserFieldErrors = {
  email?: string;
  password?: string;
  rePassword?: string;
};

export type SignUpDeriverResult =
  | {
      success: false;
      message: string;
      errors: SignUpUserFieldErrors;
    }
  | {
      success: true;
      message: string;
    };

export const deriveSignUpUser = ({
  existingUser,
  email,
  password,
  rePassword,
}: {
  existingUser: any;
  email: string;
  password: string;
  rePassword: string;
}): SignUpDeriverResult => {
  if (existingUser) {
    return {
      success: false,
      message: 'User with provided email already existed',
      errors: {
        email: 'User with provided email already existed',
      },
    };
  }

  if (!email || !password || !rePassword) {
    return {
      success: false,
      message: 'Missing required info to sign up a user',
      errors: {
        email: !email ? 'Required' : '',
        password: !password ? 'Required' : '',
        rePassword: !rePassword ? 'Required' : '',
      },
    };
  }

  if (password !== rePassword) {
    return {
      success: false,
      message: 'Password does not match',
      errors: {
        password: 'Password does not match',
        rePassword: 'Password does not match',
      },
    };
  }

  return {
    success: true,
    message: 'Valid user info',
  };
};
