import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import CarouselArrowRight from '@/components/SVGs/CarouselArrowRight';
import { FeatureType } from '../../feature.model';

const FeatureHeader = ({
	isWide,
	name,
	isNew,
	heading,
	headerIcon,
}: Pick<FeatureType, 'isWide' | 'name' | 'isNew' | 'heading' | 'headerIcon'>) => {
	return (
		<div className={styles.headerWrapper}>
			<header className={isWide ? styles[`header--wide`] : ''}>
				<div className={`${styles.nameWrapper} flex-align-center gap-050`}>
					<Image
						className={styles.icon}
						width={32}
						height={32}
						loading="lazy"
						src={headerIcon.src}
						alt={headerIcon.alt}
					/>
					<h3 className={styles.name}>{name}</h3>
					{isNew && <span className={`${styles.badge} rounded`}>New</span>}
				</div>
				<div className={`${styles.headingWrapper} ${isWide && styles[`headingWrapper--wide`]}`}>
					<h2 className={styles.heading}>{heading}</h2>
					<div className={`${styles.svgWrapper} ${isWide && styles[`svgWrapper--wide`]}`}>
						<CarouselArrowRight
							outerClassName={styles.arrowOuterSvg}
							innerClassName={`${styles.arrowInnerSvg} block flex-shrink-0`}
						/>
					</div>
				</div>
			</header>
		</div>
	);
};

export default FeatureHeader;
