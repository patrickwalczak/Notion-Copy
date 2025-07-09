import React from 'react';
import styles from './styles.module.scss';
import BlockActions from '../../blockActions/BlockActions';

const Block = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.container}>
			<BlockActions />
			{children}
		</div>
	);
};

export default Block;
