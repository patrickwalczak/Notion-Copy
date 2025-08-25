import React from 'react';
import styles from './styles.module.scss';
import { mergeClasses } from '@/lib/utils/mergeClasses';
import FieldWrapper from '../fieldWrapper/FieldWrapper';
import Field from '../field/Field';

type FormProps = {
	isLogin?: boolean;
	action: (formData: FormData) => void;
	defaultValues?: { email?: string; password?: string };
	errors?: Record<string, string>;
	isPending?: boolean;
};

const Form = ({ isLogin = false, action, defaultValues, errors, isPending }: FormProps) => {
	return (
		<div className={mergeClasses(styles.container, 'flex', 'flex-column', 'justify-center', 'gap-1')}>
			<div className={styles.headings}>
				<h1 className={mergeClasses(styles.h1, styles.heading)}>Think it. Make it.</h1>
				<h2 className={mergeClasses(styles.h2, styles.heading)}>
					{isLogin ? 'Log in to your Notion account' : 'Sign up for Notion'}
				</h2>
			</div>

			<form action={action} className={mergeClasses('flex flex-column gap-075')}>
				<FieldWrapper className={mergeClasses('flex', 'flex-column', 'gap-025')}>
					<Field
						label="Email"
						name="email"
						type="email"
						placeholder="Enter your email address..."
						defaultValue={defaultValues?.email}
						error={errors?.email}
						required
						autoComplete="email"
						autoCapitalize="none"
						autoCorrect="off"
						spellCheck={false}
						disabled={isPending}
					/>
				</FieldWrapper>

				<FieldWrapper className={mergeClasses('flex', 'flex-column', 'gap-025')}>
					<Field
						label="Password"
						name="password"
						type="password"
						placeholder="Enter your password..."
						defaultValue={defaultValues?.password}
						error={errors?.password}
						required
						autoComplete="current-password"
						disabled={isPending}
					/>
				</FieldWrapper>

				<button type="submit" className={mergeClasses(styles.button, 'rounded-sm')} disabled={isPending}>
					{isPending ? 'Please wait...' : isLogin ? 'Log in' : 'Sign up'}
				</button>
			</form>
		</div>
	);
};

export default Form;
