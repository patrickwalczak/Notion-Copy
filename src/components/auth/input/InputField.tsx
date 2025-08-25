import React from 'react';
import styles from './styles.module.scss';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	ariaLabel: string;
	name: string;
	inputClassName?: string;
	wrapperClassName?: string;
	error?: string;
}

const InputField = ({
	wrapperClassName = '',
	inputClassName = '',
	name,
	label,
	ariaLabel,
	type,
	placeholder,
	defaultValue,
	error,
	...rest
}: InputFieldProps) => {
	return (
		<div className={`${styles.inputWrapper} ${wrapperClassName} flex flex-column`}>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				aria-label={ariaLabel}
				type={type}
				placeholder={placeholder}
				name={name}
				defaultValue={defaultValue}
				className={`${styles.input} ${inputClassName} ${error ? styles.errorInput : ''}`}
				{...rest}
			/>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default InputField;
