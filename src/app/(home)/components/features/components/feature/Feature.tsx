import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FeatureType } from '../../feature.model';
import FeatureHeader from '../featureHeader/FeatureHeader';
import FeatureImage from '../featureImage/FeatureImage';
import FeatureAnimation from '../featureAnimation/FeatureAnimation';

const Feature = ({ name, isNew, isWide, heading, headerIcon, color, image, animationImage, link }: FeatureType) => {
	return (
		<article
			className={`
				${styles.feature}
				${styles[`feature--${color}`]} 
			  ${isWide && styles[`feature--wide`]}
				`}
		>
			<FeatureHeader isNew={isNew} isWide={isWide} name={name} heading={heading} headerIcon={headerIcon} />
			<FeatureImage image={image} isWide={isWide} />
			<FeatureAnimation animationImage={animationImage} />
			<Link
				title={link.label}
				href={link.href}
				className={`${styles.link} ${styles[`link--${color}`]}`}
				aria-label={heading}
			/>
		</article>
	);
};

export default Feature;
