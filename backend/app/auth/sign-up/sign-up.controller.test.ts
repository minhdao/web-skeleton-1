import { deriveSignUpUser } from './sign-up.deriver';
import { signUpUser } from './sign-up.controller';

jest.mock('./sign-up.deriver');

describe('sign-up controller', () => {
  describe('signUpUser', () => {
    it('return unsuccess result if deriver result is unsuccessful', async () => {
      // Mock deriveSignUpUser
      (deriveSignUpUser as jest.Mock).mockReturnValue({
        success: false,
        message: 'invalid inputs',
      });

      const result = await signUpUser({
        email: 'test@example.com',
        password: 'password123',
        rePassword: 'password123',
      });

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual('invalid inputs');
    });
  });
});
