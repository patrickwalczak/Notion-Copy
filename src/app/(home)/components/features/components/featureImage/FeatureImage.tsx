import React from 'react';
import styles from './styles.module.scss';
import { FeatureType } from '../../feature.model';
import Image from 'next/image';

const FeatureImage = ({ image, isWide }: Pick<FeatureType, 'image' | 'isWide'>) => {
	return (
		<picture className={`${styles.picture} ${isWide && styles[`picture--wide`]} flex`}>
			<Image
				width={image.width}
				height={image.height}
				loading="lazy"
				alt={image.alt}
				className={`${styles.img} ${isWide && styles[`img--wide`]}`}
				src={image.src}
			/>
		</picture>
	);
};

export default FeatureImage;
