import React, { ReactNode } from 'react';
import useIsOpenState from '@/lib/hooks/useIsOpenState';
import PopupWrapper from '../popupWrapper/PopupWrapper';
import PopupContentShell from '../popupContentShell/PopupContentShell';
import { mergeClasses } from '@/lib/utils/mergeClasses';
import OptionList from '../optionList/OptionList';
import styles from './styles.module.scss';

const colorOptions = [
	{ id: 0, label: 'Default', value: 'inherit' },
	{ id: 1, label: 'Gray', value: '#9B9B9B' },
	{ id: 2, label: 'Brown', value: '#BA856F' },
	{ id: 3, label: 'Orange', value: '#C77D48' },
	{ id: 4, label: 'Yellow', value: '#CA984D' },
	{ id: 5, label: 'Green', value: '#529E72' },
	{ id: 6, label: 'Blue', value: '#379AD3' },
	{ id: 7, label: 'Purple', value: '#9D68D3' },
	{ id: 8, label: 'Pink', value: '#D15796' },
	{ id: 9, label: 'Red', value: '#E65B58' },
];

export const COLOR_OPTIONS = [
	'#9B9B9B', // gray
	'#BA856F', // brown
	'#C77D48', // orange
	'#CA984D', // yellow
	'#529E72', // green
	'#379AD3', // blue
	'#9D68D3', // purple
	'#D15796', // pink
	'#E65B58', // red
] as const;

const ColorOperation = ({
	changeColor,
	changeBackground,
}: {
	changeColor: (color: string) => void;
	changeBackground: (color: string) => void;
}) => {
	const { isOpen, open, close } = useIsOpenState();

	const handleTextOptionClick = (value: string) => {
		close();
		changeColor(value);
	};

	const handleBackgroundOptionClick = (value: string) => {
		close();
		changeBackground(value);
	};

	return (
		<>
			<li>
				<button onMouseEnter={open} className="block-operations__button flex align-center button-empty">
					{'Color'}
				</button>
			</li>
			{isOpen && (
				<PopupWrapper className={styles.popup} initialPosition={{ top: 0, left: '100%' }}>
					<PopupContentShell className={mergeClasses('gap-050', styles.content)}>
						<OptionList className="px-025 gap-025">
							<OptionList.Header>{'Text color'}</OptionList.Header>
							<OptionList.List className={mergeClasses('gap-025')}>
								{colorOptions.map(({ id, label, value }) => (
									<Option key={id} label={`${label} text`} value={value} onClick={handleTextOptionClick}>
										<span
											className={mergeClasses(styles.colorTextOption, 'flex-center')}
											style={{ color: value, borderColor: value }}
										>
											{'A'}
										</span>
									</Option>
								))}
							</OptionList.List>
						</OptionList>
						<OptionList className="px-025 gap-025">
							<OptionList.Header>{'Background color'}</OptionList.Header>
							<OptionList.List className={mergeClasses('gap-025')}>
								{colorOptions.map(({ id, label, value }) => (
									<Option key={id} label={`${label} background`} value={value} onClick={handleBackgroundOptionClick}>
										<div className={styles.backgroundOption} style={{ backgroundColor: value }}></div>
									</Option>
								))}
							</OptionList.List>
						</OptionList>
					</PopupContentShell>
				</PopupWrapper>
			)}
		</>
	);
};

const Option = ({
	label,
	onClick,
	value,
	children,
}: {
	label: string;
	onClick: (value: string) => void;
	value: string;
	children: ReactNode;
}) => {
	const handleClick = () => {
		onClick(value);
	};

	return (
		<li>
			<button onClick={handleClick} className="block-operations__button flex align-center button-empty gap-050">
				{children}
				{label}
			</button>
		</li>
	);
};

export default ColorOperation;
