import React from 'react';
import styles from './styles.module.scss';

const Feature = ({ name, isNew, isWide, heading, headerIcon, bgColor, image, animationImage }) => {
	return (
		<article data-css-is-wide={isWide} className={`${styles.feature}`} style={{ backgroundColor: `var(${bgColor})` }}>
			<div className={styles.headerWrapper}>
				<header className={styles.header} data-css-is-wide={isWide}>
					<div className={`${styles.nameWrapper} flex-align-center gap-050`}>
						<img
							className={`${styles.icon}`}
							width={32}
							height={32}
							loading="lazy"
							decoding="async"
							src={headerIcon.src}
							alt={headerIcon.alt}
						/>
						<h3 className={styles.name}>{name}</h3>
						{isNew && <span className={`${styles.badge} rounded`}>New</span>}
					</div>
					<div className={`${styles.headingWrapper}`} data-css-is-wide={isWide}>
						<h2 className={styles.heading}>{heading}</h2>
						<div className={styles.svgWrapper} data-css-is-wide={isWide}>
							<svg
								height="32"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 64 64"
								width="32"
								className={styles.arrowWrapper}
							>
								<svg className={`${styles.arrow} block flex-shrink-0`} viewBox="0 0 33 32">
									<rect
										width="31.2"
										height="31.2"
										x=".9"
										y=".4"
										rx="15.6"
										stroke="#F6F5F4"
										strokeWidth="1"
										fill="white"
									></rect>
									<path
										fill="#000"
										d="m23.769 16-7.2 7.2-1.272-1.272 5.028-5.028H9.297v-1.8h11.028l-5.028-5.028L16.569 8.8l7.2 7.2Z"
									></path>
								</svg>
							</svg>
						</div>
					</div>
				</header>
			</div>
			<picture className={`${styles.picture} flex`} data-css-is-wide={isWide}>
				<img
					loading="lazy"
					decoding="async"
					alt={image.alt}
					className={`${styles.img}`}
					data-css-is-wide={isWide}
					src={image.src}
				/>
			</picture>
			<div>
				<div>{/* <img src={animationImage} alt="" /> */}</div>
			</div>
			<a href=""></a>
		</article>
	);
};

export default Feature;
