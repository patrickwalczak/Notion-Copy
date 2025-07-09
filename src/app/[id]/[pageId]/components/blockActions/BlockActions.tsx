import React, { useState } from 'react';
import styles from './styles.module.scss';
import BlockOperations from '../blockOperations/BlockOperations';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import Plus from '@/components/SVGs/Plus';
import Dots from '@/components/SVGs/Dots';

const BlockActions = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useOutsideClick(() => setIsOpen(false));

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsOpen((prev) => !prev);
	};

	return (
		<div ref={ref} className={styles.container}>
			<button
				className={`${styles.button} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
			>
				<Dots className="flex-grow-0" />
			</button>
			<button
				title="Click to open menu"
				onClick={toggleMenu}
				className={`${styles.button} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
			>
				<Plus className="plus-svg flex-grow-0" />
			</button>

			{/* {isOpen && <BlockOperations />} */}
		</div>
	);
};

export default BlockActions;
