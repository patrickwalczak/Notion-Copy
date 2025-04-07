'use client';

import styles from './styles.module.scss';
import React from 'react';

const MoreButton = ({ onClick = () => {}, className = '' }: { onClick?: () => void; className?: string }) => {
	return (
		<button onClick={onClick} className={`${styles.button} ${className}`} aria-label="More">
			<svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 26 26" className={styles.svg}>
				<path d="M4.56613 14.857C5.5918 14.857 6.42327 14.0255 6.42327 12.9998C6.42327 11.9742 5.5918 11.1427 4.56613 11.1427C3.54046 11.1427 2.70898 11.9742 2.70898 12.9998C2.70898 14.0255 3.54046 14.857 4.56613 14.857Z M20.2923 14.8571C21.318 14.8571 22.1495 14.0257 22.1495 13C22.1495 11.9743 21.318 11.1428 20.2923 11.1428C19.2667 11.1428 18.4352 11.9743 18.4352 13C18.4352 14.0257 19.2667 14.8571 20.2923 14.8571Z M12.429 14.8571C13.4546 14.8571 14.2861 14.0257 14.2861 13C14.2861 11.9743 13.4546 11.1428 12.429 11.1428C11.4033 11.1428 10.5718 11.9743 10.5718 13C10.5718 14.0257 11.4033 14.8571 12.429 14.8571Z"></path>
			</svg>
		</button>
	);
};

export default MoreButton;
