import { TextElementType } from '@/types/block';
import React from 'react';
import styles from './styles.module.scss';

const TextBlock = ({ block }: { block: TextElementType }) => {
	return <div className={styles.text}>{block.properties.name}</div>;
};

export default TextBlock;
