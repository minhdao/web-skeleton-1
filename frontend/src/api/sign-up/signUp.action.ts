import axios from 'axios';
import { BACKEND_SERVER } from '../server';
import { SignUpResponse } from './singUp.type';

export const signUpUser = async ({
  username,
  password,
  confirmPassword,
}: {
  username: string;
  password: string;
  confirmPassword: string;
}): Promise<SignUpResponse | undefined> => {
  try {
    // API call to sign up the user
    const response = await axios.post<SignUpResponse>(
      `${BACKEND_SERVER.url.signUp}`,
      {
        email: username,
        password: password,
        rePassword: confirmPassword,
      },
      {
        validateStatus: (status) => status < 500, // Resolve promise for all status codes < 500
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
