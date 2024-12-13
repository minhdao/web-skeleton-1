import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignUpForm } from './SignUpForm';
import { signUpUser } from '../../api/sign-up/signUp.action';
import { SignUpResponse } from '../../api/sign-up/singUp.type';

jest.mock('../../api/sign-up/signUp.action', () => ({
  signUpUser: jest.fn(),
}));

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit form successfully when data is valid', async () => {
    const mockSignUpUser = (signUpUser as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({} as SignUpResponse)
    );

    render(<SignUpForm />);

    // Type valid data into the fields
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Wait for API call to complete
    await waitFor(() => expect(mockSignUpUser).toHaveBeenCalledTimes(1));
    expect(mockSignUpUser).toHaveBeenCalledWith({
      username: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
  });

  // it('should show errors from API when submission fails', async () => {
  //   const mockSignUpUser = signUpUser as jest.MockedFunction<typeof signUpUser>;
  //   mockSignUpUser.mockResolvedValueOnce({
  //     errors: {
  //       username: 'Username already taken',
  //     },
  //   });

  //   render(<SignUpForm />);

  //   // Type valid data into the fields
  //   fireEvent.change(screen.getByLabelText(/username/i), {
  //     target: { value: 'john.doe@example.com' },
  //   });
  //   fireEvent.change(screen.getByLabelText(/password/i), {
  //     target: { value: 'password123' },
  //   });
  //   fireEvent.change(screen.getByLabelText(/confirm password/i), {
  //     target: { value: 'password123' },
  //   });

  //   // Submit the form
  //   fireEvent.click(screen.getByRole('button', { name: /create account/i }));

  //   // Wait for API response
  //   await waitFor(() => {
  //     expect(screen.getByText(/username already taken/i)).toBeInTheDocument();
  //   });
  // });
});
