import { useState } from 'react';
import axios from 'axios';
import { BACKEND_SERVER } from '../../api/server';

export const useSignUpAction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    // Basic validation
    if (!username || !password || password !== confirmPassword) {
      setError('Please fill in all fields and make sure passwords match.');
      return;
    }

    try {
      setLoading(true);
      setError(null); // Reset error state
      setSuccessMessage(null); // Reset success state

      // API call to sign up the user
      const response = await axios.post(`${BACKEND_SERVER.url.signUp}`, {
        email: username,
        password: password,
        rePassword: confirmPassword,
      });

      console.log(response.data);

      if (response.data) {
        setSuccessMessage('Sign up successful! Please log in.');
      }
    } catch (error: any) {
      console.log(error.message);
      setError(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    error,
    successMessage,
  };
};
