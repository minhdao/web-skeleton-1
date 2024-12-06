import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SignUpForm } from './SignUpForm';
import * as signUpActions from './signUp.action';

describe('SignUpForm', () => {
  let mockHandleSubmit: jest.Mock;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();

    jest.spyOn(signUpActions, 'useSignUpAction').mockReturnValue({
      handleSubmit: mockHandleSubmit, // Mock the function
      loading: false, // Mock the other required fields
      error: null,
      successMessage: null,
    });
  });

  afterEach(() => {
    jest.resetAllMocks(); // Reset mocks after each test
  });

  it('render the form fields and submit button', () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Create account/i })
    ).toBeInTheDocument();
  });

  it('allow user to input values', () => {
    render(<SignUpForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'confirmTestPassword' },
    });

    expect(usernameInput).toHaveValue('testUsername');
    expect(passwordInput).toHaveValue('testPassword');
    expect(confirmPasswordInput).toHaveValue('confirmTestPassword');
  });

  it('call handleSubmit with the correct values from the form', () => {
    render(<SignUpForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Create account' });

    fireEvent.change(usernameInput, {
      target: { value: 'testUsername@example.com' }, // "@example.com" is important because the input is type email, and it won't allow submit until the format is correct
    });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'confirmTestPassword' },
    });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenLastCalledWith(
      'testUsername@example.com',
      'testPassword',
      'confirmTestPassword'
    );
  });
});
