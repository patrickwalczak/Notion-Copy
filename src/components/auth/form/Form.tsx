import React from 'react';
import styles from './styles.module.scss';
import InputGroup from '../inputGroup/InputGroup';
import InputField from '../input/InputField';

const Form = ({ isLogin = false, action }: { isLogin?: boolean; action: string }) => {
	return (
		<div className={`${styles.container}`}>
			<div className={styles.headings}>
				<h1 className={`${styles.h1} ${styles.heading}`}>Think it. Make it.</h1>
				<h2 className={`${styles.h2} ${styles.heading}`}>
					{isLogin ? 'Log in to your Notion account' : 'Sign up for Notion'}
				</h2>
			</div>
			<form action={action} className={`${styles.form} flex-column gap-075`}>
				<InputGroup>
					<InputField
						label="Email"
						ariaLabel="Enter your email address..."
						type="email"
						placeholder="Enter your email address.."
						name="email"
					/>
				</InputGroup>
				<InputGroup>
					<InputField
						label="Password"
						ariaLabel="Enter your password..."
						type="password"
						placeholder="Enter your password..."
						name="password"
					/>
				</InputGroup>
				<button type="submit" className={styles.button}>
					Continue
				</button>
			</form>
		</div>
	);
};

export default Form;
