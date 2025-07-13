import React, { useContext, useState } from 'react';
import './styles.scss';
import { BlockContext } from '../blocks/block/Block';

interface Position {
	top?: number | string;
	left?: number | string;
	bottom?: number | string;
	right?: number | string;
}

const BlockOperations = () => {
	const [position, setPosition] = useState<Position | null>(null);
	const { block } = useContext(BlockContext);

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
					<div className="block-operations__dialog-content">
						<div className="block-operations__header">
							<div className="block-operations__search-container">
								<div className="block-operations__search-box">
									<input
										placeholder="Search actions…"
										type="text"
										className="block-operations__input"
										role="combobox"
										aria-expanded="true"
										aria-haspopup="listbox"
										aria-controls="listbox"
										aria-activedescendant=":r4l:"
										onClick={(e) => e.stopPropagation()}
									/>
								</div>
							</div>
						</div>

						<div className="block-operations__scroller">
							<div className="block-operations__listbox-header">{block.type}</div>

							<ul className="block-operations__listbox" id="listbox" role="listbox">
								<li className="block-operations__option">Turn into</li>
								<li className="block-operations__option">Color</li>
								<li className="block-operations__option">Copy link to block</li>
								<li className="block-operations__option">Duplicate</li>
								<li className="block-operations__option">Move to</li>
								<li className="block-operations__option">Delete</li>
							</ul>

							<div className="block-operations__footer">
								<div className="block-operations__edited-by">Last edited by Jane Doe</div>
								<div className="block-operations__timestamp">Yesterday at 9:50 PM</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlockOperations;
