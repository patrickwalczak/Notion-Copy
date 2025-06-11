import React from 'react';
import styles from './styles.module.scss';
import Feature from './components/feature/Feature';
import { FeatureType } from './feature.model';

const features: FeatureType[] = [
	{
		id: 0,
		name: 'AI Meeting Notes',
		heading: 'Perfect notes every time.',
		isNew: true,
		isWide: false,
		color: 'red',
		headerIcon: {
			src: '/microphone.png',
			alt: '',
			width: 96,
			height: 95,
		},
		image: {
			src: '/feature1.png',
			alt: '',
			width: 1241,
			height: 816,
		},
		animationImage: {
			src: '/feature1.gif',
		},
		link: {
			href: '/',
			label: 'Try it',
		},
	},
	{
		id: 1,
		name: 'Enterprise search',
		isNew: true,
		isWide: false,
		color: 'blue',
		heading: 'One search for everything.',
		headerIcon: {
			src: '/search.png',
			alt: '',
			width: 96,
			height: 95,
		},
		image: {
			src: '/feature2.png',
			alt: '',
			width: 1229,
			height: 816,
		},
		animationImage: {
			src: '/feature2.gif',
		},
		link: {
			href: '/',
			label: 'Try it',
		},
	},
	{
		id: 2,
		name: 'Projects',
		isNew: false,
		isWide: true,
		color: 'yellow',
		heading: 'Keep every plan on track.',
		headerIcon: {
			src: '/target.png',
			alt: '',
			width: 96,
			height: 95,
		},
		image: {
			src: '/feature3.png',
			alt: '',
			width: 1440,
			height: 501,
		},
		animationImage: {
			src: '/feature3.gif',
		},
		link: {
			href: '/',
			label: 'Get started',
		},
	},
	{
		id: 3,
		name: 'Notion Mail',
		isNew: true,
		isWide: false,
		color: 'gray',
		heading: 'The inbox that thinks like you.',
		headerIcon: {
			src: '/paper_plain.png',
			alt: '',
			width: 96,
			height: 95,
		},
		image: {
			src: '/feature4.png',
			alt: '',
			width: 1241,
			height: 816,
		},
		animationImage: {
			src: '/feature4.gif',
		},
		link: {
			href: '/',
			label: 'Download for free',
		},
	},
	{
		id: 4,
		name: 'Business-in-a-box',
		isNew: false,
		isWide: false,
		color: 'teal',
		heading: 'Run your entire company.',
		headerIcon: {
			src: '/shapes.png',
			alt: '',
			width: 96,
			height: 95,
		},
		image: {
			src: '/feature5.png',
			alt: '',
			width: 1229,
			height: 816,
		},
		animationImage: {
			src: '/feature5.gif',
		},
		link: {
			href: '/',
			label: 'Download template',
		},
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
