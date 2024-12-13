import { FormikErrors, FormikValues, useFormik } from 'formik';
import { signUpUser } from '../../api/sign-up/signUp.action';

const validateSignUpFields = (values: FormikValues) => {
  const errors: FormikErrors<Record<string, string>> = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 4) {
    errors.username = 'Must be at least 4 characters';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = 'Username must be a valid email';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 4) {
    errors.password = 'Must be at least 4 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm password doesn not match';
  }

  return errors;
};

export function SignUpForm() {
  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validate: validateSignUpFields,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);

      const result = await signUpUser({
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (result?.errors) {
        setErrors(result.errors);
      }

      setSubmitting(false);
    },
  });

  // const { handleSubmit } = useSignUpAction();

  return (
    <div className="min-h-96 min-w-96 bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8 justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/229055/mailing-mail.svg"
          alt="Workflow"
        ></img>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          or{' '}
          <a href="#" className="hover:underline">
            Sign In
          </a>{' '}
          an existing account
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium leading-5  text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="username"
                  name="username"
                  placeholder="john.doe@example.com"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="mt-6">
                <label
                  className="block text-sm font-medium leading-5 text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="mt-6">
                <label
                  className="block text-sm font-medium leading-5 text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Create account
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
