import React from 'react';
import styles from './styles.module.scss';
import Feature from './Feature';

const features = [
	{
		id: 0,
		name: 'AI Meeting Notes',
		isNew: true,
		heading: 'Perfect notes every time.',
		headerIcon: {
			src: 'microphone.png',
			alt: '',
		},
		bgColor: '--color-red-100',
		image: {
			src: 'feature1.png',
			alt: '',
			isWide: false,
		},
		animationImage: '',
	},
	{
		id: 1,
		name: 'Enterprise search',
		isNew: true,
		heading: 'One search for everything.',
		headerIcon: {
			src: 'search.png',
			alt: '',
		},
		bgColor: '--color-blue-100',
		image: {
			src: 'feature2.png',
			alt: '',
			isWide: false,
		},
		animationImage: '',
	},
	{
		id: 2,
		name: 'Projects',
		isNew: false,
		heading: 'Keep every plan on track.',
		headerIcon: {
			src: 'target.png',
			alt: '',
		},
		bgColor: '--color-yellow-100',
		image: {
			src: 'feature3.png',
			alt: '',
			isWide: true,
		},
		animationImage: '',
	},
	{
		id: 3,
		name: 'Notion Mail',
		isNew: true,
		heading: 'The inbox that thinks like you.',
		headerIcon: {
			src: 'paper_plain.png',
			alt: '',
		},
		bgColor: '--color-gray-100',
		image: {
			src: 'feature4.png',
			alt: '',
			isWide: false,
		},
		animationImage: '',
	},
	{
		id: 4,
		name: 'Business-in-a-box',
		isNew: false,
		heading: 'Run your entire company.',
		headerIcon: {
			src: 'shapes.png',
			alt: '',
		},
		bgColor: '--color-teal-100',
		image: {
			src: 'feature5.png',
			alt: '',
			isWide: false,
		},
		animationImage: '',
	},
];

const Features = () => {
	return (
		<section className={`${styles.section}`}>
			{features.map((feature) => (
				<Feature key={feature.name} {...feature} />
			))}
		</section>
	);
};

export default Features;
