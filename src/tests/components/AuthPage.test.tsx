import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthPage from '@/app/(auth)/components/AuthPage';
import { signUp } from '@/actions/auth';

jest.mock('@/actions/auth');

const user = userEvent.setup();

const formHeadingOne = /Think it. Make it./i;
const formHeadingTwo = (isLogin: boolean) => (isLogin ? /Log in to your Notion account/i : /Sign up for Notion/i);

const getEmailInput = () => screen.getByLabelText(/email/i);
const getPasswordInput = () => screen.getByLabelText(/password/i);
const getSubmitButton = (isLogin: boolean) => screen.getByRole('button', { name: isLogin ? /Log in/i : /Sign up/i });

describe('AuthPage', () => {
	it('should render', () => {
		const isLogin = true;

		render(<AuthPage isLogin={isLogin} action={signUp} />);

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
});
