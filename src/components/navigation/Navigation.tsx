'use client';
import styles from './navigation.module.scss';
import { AppContext } from '@/context/AppContext';
import { useSafeContext } from '@/hooks/useSafeContext';

const Navigation = () => {
	const { state, dispatch } = useSafeContext(AppContext);

	return <nav data-css-is-open={state.isNavigationOpen} className={styles.navigation}></nav>;
};

export default Navigation;
