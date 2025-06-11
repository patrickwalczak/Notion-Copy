type FeatureColorsType = 'red' | 'blue' | 'gray' | 'teal' | 'yellow';

export interface FeatureType {
	id: number;
	name: string;
	heading: string;
	isNew: boolean;
	isWide: boolean;
	color: FeatureColorsType;
	headerIcon: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	image: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	animationImage: {
		src: string;
	};
	link: {
		href: string;
		label: string;
	};
}
