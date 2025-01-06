import { Request, Response } from 'express';
import { signUpUser } from './sign-up.controller';
import { z } from 'zod';

const SignUpUserInputs = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
  rePassword: z.string().min(1, 'Retype password required'),
});

export const handleSignUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password, rePassword } = req.body;

    const inputsCheckResult = SignUpUserInputs.safeParse({
      email,
      password,
      rePassword,
    });

    if (!inputsCheckResult.success) {
      res.status(400).send({
        message: 'Invalid inputs',
        errors: inputsCheckResult.error.formErrors,
      });

      return;
    }

    const result = await signUpUser({ email, password, rePassword });

    if (!result.success) {
      console.log(result.errors);
      res.status(400).send({ message: result.message, errors: result.errors });

      return;
    }

    // set a cookie with JWT of the user
    res.cookie('token', result.token, { maxAge: 900000 });
    // send back success reponse
    res.status(200).send({ message: result.message });
  } catch (err) {
    console.error(err);

    // Consider sending error to custom centralized error handler using next(err)

    res.status(500).send({
      message: 'Something went wrong on our side. Please try again later.',
    });
  }
};
