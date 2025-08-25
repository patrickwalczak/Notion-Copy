import React, { useId } from 'react';
import styles from './styles.module.scss';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	ariaLabel?: string;
	error?: string;
}

export default function Field({ label, name, error, required, ...rest }: FieldProps) {
	const uid = useId();
	const inputId = `${name}-${uid}`;
	const errorId = error ? `${inputId}-error` : undefined;

	return (
		<>
			<label className={styles.label} htmlFor={inputId}>
				{label}
				{required ? (
					<span className={styles.req} aria-hidden="true">
						*
					</span>
				) : null}
			</label>
			<input
				id={inputId}
				name={name}
				aria-describedby={errorId || undefined}
				aria-invalid={!!error || undefined}
				aria-errormessage={error ? errorId : undefined}
				className={styles.input}
				{...rest}
			/>
			{error && (
				<p id={errorId} className={styles.error} aria-live="polite" aria-atomic="true">
					{error}
				</p>
			)}
		</>
	);
}
