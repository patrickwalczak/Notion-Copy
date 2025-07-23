import React, { useState } from 'react';
import './styles.scss';

interface Position {
	top?: number | string;
	left?: number | string;
	bottom?: number | string;
	right?: number | string;
}

const BlockOperationsPopup = ({ children }: { children: React.ReactNode }) => {
	const [position, setPosition] = useState<Position | null>(null);

	const refCallback = (node: HTMLDivElement) => {
		if (node) {
			const rect = node.getBoundingClientRect();

			if (rect.x < 0) {
				setPosition({ ...position, left: 0, top: '100%' });
			}
		}
	};

	return (
		<div className="block-operations" ref={refCallback} style={{ ...position }}>
			<div className="block-operations__container">
				<div className="block-operations__dialog" role="dialog" aria-modal="true">
					<div className="block-operations__dialog-content">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default BlockOperationsPopup;
