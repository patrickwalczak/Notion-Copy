import React from 'react';
import styles from './styles.module.scss';
import InputGroup from '../inputGroup/InputGroup';
import InputField from '../input/InputField';
import { mergeClasses } from '@/lib/utils/mergeClasses';

const Form = ({
	isLogin = false,
	action,
	defaultValues,
	errors,
	isPending,
}: {
	isLogin?: boolean;
	action: (formData: FormData) => void;
	defaultValues?: { email?: string; password?: string };
	errors?: Record<string, string>;
	isPending?: boolean;
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.headings}>
				<h1 className={`${styles.h1} ${styles.heading}`}>Think it. Make it.</h1>
				<h2 className={`${styles.h2} ${styles.heading}`}>
					{isLogin ? 'Log in to your Notion account' : 'Sign up for Notion'}
				</h2>
			</div>
			<form action={action} className={`${styles.form} flex flex-column gap-075`}>
				<InputGroup>
					<InputField
						label="Email"
						ariaLabel="Enter your email address..."
						type="email"
						placeholder="Enter your email address.."
						name="email"
						defaultValue={defaultValues?.email}
						error={errors?.email}
						disabled={isPending}
					/>
				</InputGroup>

				<InputGroup>
					<InputField
						label="Password"
						ariaLabel="Enter your password..."
						type="password"
						placeholder="Enter your password..."
						name="password"
						defaultValue={defaultValues?.password}
						error={errors?.password}
						disabled={isPending}
					/>
				</InputGroup>

				<button type="submit" className={mergeClasses(styles.button, 'rounded-sm')} disabled={isPending}>
					{isPending ? 'Please wait...' : isLogin ? 'Log in' : 'Sign up'}
				</button>
			</form>
		</div>
	);
};

export default Form;
