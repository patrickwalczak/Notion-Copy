import { render, screen, waitFor } from '@testing-library/react';
import AuthPage from '@/app/(auth)/components/AuthPage';
import userEvent from '@testing-library/user-event';

const formHeadingOne = /Think it\. Make it\./i;
const formHeadingTwo = (isLogin: boolean) => (isLogin ? /Log in to your Notion account/i : /Sign up for Notion/i);

const passwordError = /password must be at least 6 characters/i;
const emailError = /enter a valid email/i;

const loginLabel = /log in/i;
const signupLabel = /sign up/i;
const loadingLabel = /please wait/i;

const getEmailInput = () => screen.getByLabelText(/email/i);
const getPasswordInput = () => screen.getByLabelText(/password/i);
const getSubmitButton = (isLogin: boolean) => screen.getByRole('button', { name: isLogin ? loginLabel : signupLabel });
const getEmailError = () => screen.getByText(emailError);
const getPasswordError = () => screen.getByText(passwordError);

const user = userEvent.setup();

function getDefferredPromise<T = void>() {
	let resolve!: (v: T) => void;
	const promise = new Promise<T>((r) => (resolve = r));
	return { promise, resolve };
}

describe('AuthPage', () => {
	it('should render (login variant)', () => {
		const isLogin = true;
		const action = jest.fn(async () => undefined);

		render(<AuthPage isLogin={isLogin} action={action} />);

		expect(screen.getByRole('navigation')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 1, name: formHeadingOne })).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 2, name: formHeadingTwo(isLogin) })).toBeInTheDocument();

		const emailInput = getEmailInput();
		const passwordInput = getPasswordInput();
		const submitButton = getSubmitButton(isLogin);

		expect(emailInput).toBeInTheDocument();
		expect(emailInput).toHaveAttribute('type', 'email');
		expect(emailInput).not.toBeDisabled();

		expect(passwordInput).toBeInTheDocument();
		expect(passwordInput).toHaveAttribute('type', 'password');
		expect(passwordInput).not.toBeDisabled();

		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toHaveAttribute('type', 'submit');
		expect(submitButton).not.toBeDisabled();
	});

	it('renders signup variant heading/button', () => {
		const isLogin = false;
		const action = jest.fn(async () => undefined);

		render(<AuthPage isLogin={isLogin} action={action} />);

		expect(screen.getByRole('heading', { level: 2, name: formHeadingTwo(isLogin) })).toBeInTheDocument();
		expect(getSubmitButton(isLogin)).toBeInTheDocument();
	});

	it(`should display error messages and not call action`, async () => {
		const isLogin = false;
		const action = jest.fn(async () => undefined);

		render(<AuthPage isLogin={isLogin} action={action} />);

		const submitButton = getSubmitButton(isLogin);

		await user.click(submitButton);

		expect(action).not.toHaveBeenCalled();

		const emailInput = getEmailInput();
		const passwordInput = getPasswordInput();

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();

		const emailErrorMessage = getEmailError();
		const passwordErrorMessage = getPasswordError();

		expect(emailErrorMessage).toBeInTheDocument();
		expect(passwordErrorMessage).toBeInTheDocument();
	});

	it(`should display a password error message and not call action`, async () => {
		const isLogin = false;
		const action = jest.fn(async () => undefined);

		render(<AuthPage isLogin={isLogin} action={action} />);

		const submitButton = getSubmitButton(isLogin);
		const emailInput = getEmailInput();
		const passwordInput = getPasswordInput();

		await user.type(emailInput, 'email@test.com');
		await user.type(passwordInput, '123');
		await user.click(submitButton);

		expect(action).not.toHaveBeenCalled();

		expect(getPasswordError()).toBeInTheDocument();
		expect(screen.queryByText(emailError)).not.toBeInTheDocument();
	});
	it(`should display an email error message and not call action`, async () => {
		const isLogin = false;
		const action = jest.fn(async () => undefined);

		render(<AuthPage isLogin={isLogin} action={action} />);

		const submitButton = getSubmitButton(isLogin);
		const emailInput = getEmailInput();
		const passwordInput = getPasswordInput();

		await user.type(emailInput, 'email@');
		await user.type(passwordInput, 'test123456');
		await user.click(submitButton);

		expect(action).not.toHaveBeenCalled();

		expect(getEmailError()).toBeInTheDocument();
		expect(screen.queryByText(passwordError)).not.toBeInTheDocument();
	});
	it(`should disable the submit button and inputs when pending and enable them when done`, async () => {
		const isLogin = false;
		const defferredPromise = getDefferredPromise<void>();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const action = jest.fn((_fd: FormData) => defferredPromise.promise);

		render(<AuthPage isLogin={isLogin} action={action} />);

		const submitButton = getSubmitButton(isLogin);
		const emailInput = getEmailInput();
		const passwordInput = getPasswordInput();

		await user.type(emailInput, 'test@example.com');
		await user.type(passwordInput, 'test123456');
		await user.click(submitButton);

		await waitFor(() => expect(action).toHaveBeenCalledTimes(1));

		await waitFor(() => {
			expect(submitButton).toBeDisabled();
			expect(submitButton).toHaveTextContent(loadingLabel);
			expect(emailInput).toBeDisabled();
			expect(passwordInput).toBeDisabled();
		});

		defferredPromise.resolve();

		await waitFor(() => {
			expect(submitButton).not.toBeDisabled();
			expect(submitButton).toHaveTextContent(signupLabel);
			expect(emailInput).not.toBeDisabled();
			expect(passwordInput).not.toBeDisabled();
		});
	});
});
