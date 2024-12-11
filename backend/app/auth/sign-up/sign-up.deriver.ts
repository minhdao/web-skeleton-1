export type SignUpDeriverResult = {
  success: boolean;
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
    };
  }

  if (!email || !password || !rePassword) {
    return {
      success: false,
      message: 'Missing required info to sign up a user',
    };
  }

  if (password !== rePassword) {
    return {
      success: false,
      message: 'Passwords does not match',
    };
  }

  return {
    success: true,
    message: 'Valid user info',
  };
};
