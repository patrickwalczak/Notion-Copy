import React from 'react';
import styles from './styles.module.scss';

interface InputFieldType {
	label: string;
	ariaLabel: string;
	inputClassName?: string;
	type: string;
	placeholder: string;
	name: string;
	wrapperClassName?: string;
}

const InputField = ({
	wrapperClassName = '',
	inputClassName = '',
	name,
	label,
	ariaLabel,
	type,
	placeholder,
}: InputFieldType) => {
	return (
		<>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<div className={`${styles.inputWrapper} ${wrapperClassName}`}>
				<input
					aria-label={ariaLabel}
					type={type}
					placeholder={placeholder}
					name={name}
					className={`${styles.input} ${inputClassName}`}
				/>
			</div>
		</>
	);
};

export default InputField;
