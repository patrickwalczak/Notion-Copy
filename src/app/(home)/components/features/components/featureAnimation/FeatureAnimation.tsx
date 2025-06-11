import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';
import { FeatureType } from '../../feature.model';

const FeatureAnimation = ({ animationImage }: Pick<FeatureType, 'animationImage'>) => {
	return (
		<div className={`${styles.animationWrapper}`}>
			<div className={`${styles.circle} flex-center`}>
				<Image
					className={styles.animationImage}
					alt="Animated Nose"
					loading="lazy"
					width={128}
					height={128}
					src={animationImage.src}
				/>
			</div>
		</div>
	);
};

export default FeatureAnimation;
