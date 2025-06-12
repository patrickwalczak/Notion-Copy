import React from 'react';
import styles from './styles.module.scss';
import CaretDown from '@/components/SVGs/CaretDown';

const ChangeLanguageButton = () => {
	return (
		<button className={`${styles.button} rounded`}>
			<span></span>
			<span>English (US)</span>
			<span>
				<CaretDown className={styles.svg} />
			</span>
		</button>
	);
};

export default ChangeLanguageButton;
