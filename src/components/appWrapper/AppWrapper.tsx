import { ReactNode } from 'react';
import styles from './styles.module.scss';

const AppWrapper = ({ children }: { children: ReactNode }) => {
	return <div className={styles.container}>{children}</div>;
};

export default AppWrapper;
