import React from 'react';
import styles from './styles.module.scss';

const TrustedBy = () => {
	return (
		<section className={`${styles.section} flex-align-center gap-1`}>
			<p className={styles.p}>Trusted by top teams</p>
			<div className={styles.imagesWrapper}>
				<div className={styles.imgWrapper}>
					<img decoding="async" loading="lazy" alt="OpenAi logo" src="openAi.png" />
				</div>
				<div className={styles.imgWrapper}>
					<img decoding="async" loading="lazy" alt="Figma logo" src="figma.svg" />
				</div>
				<div className={styles.imgWrapper}>
					<img decoding="async" loading="lazy" alt="Volvo logo" src="volvo.png" />
				</div>
				<div className={styles.imgWrapper}>
					<img decoding="async" loading="lazy" alt="Ramp logo" src="ramp.png" />
				</div>
				<div className={styles.imgWrapper}>
					<img decoding="async" loading="lazy" alt="Cursor logo" src="cursor.png" />
				</div>
				<div className={`${styles.imgWrapper} ${styles.headspace}`}>
					<img decoding="async" loading="lazy" alt="Headspace logo" src="headspace.svg" />
				</div>
				<div className={`${styles.imgWrapper} ${styles.perplexity}`}>
					<img decoding="async" loading="lazy" alt="Perplexity logo" src="perplexity.png" />
				</div>
				<div className={`${styles.imgWrapper} ${styles.vercel}`}>
					<img decoding="async" loading="lazy" alt="Vercel logo" src="vercel.svg" />
				</div>
			</div>
		</section>
	);
};

export default TrustedBy;
