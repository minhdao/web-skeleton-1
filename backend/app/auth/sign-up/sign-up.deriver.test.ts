import { deriveSignUpUser } from './sign-up.deriver';

describe('sign-up deriver', () => {
  describe('deriveSignUpUser', () => {
    it('return unsuccess result when the user already exist', () => {
      const existingUser = { email: 'user@example.com' };
      const email = 'user@example.com';
      const password = '1234';
      const rePassword = '1234';

      const result = deriveSignUpUser({
        existingUser,
        email,
        password,
        rePassword,
      });

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual(
        'User with provided email already existed'
      );
    });
  });
});
