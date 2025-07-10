import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';

interface Position {
	top?: number | string;
	left?: number | string;
	bottom?: number | string;
	right?: number | string;
}

const BlockOperations = () => {
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const [position, setPosition] = useState<Position | null>(null);

	useEffect(() => {
		if (dialogRef.current) {
			const rect = dialogRef.current.getBoundingClientRect();

			if (rect.x < 0) {
				setPosition({ ...position, left: 0, top: '100%' });
			}
		}
	}, []);

	return (
		<div className="block-operations" ref={dialogRef} style={{ ...position }}>
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
									/>
								</div>
							</div>
						</div>

						<div className="block-operations__scroller">
							<div className="block-operations__listbox-header">To-do list</div>

							<ul className="block-operations__listbox" id="listbox" role="listbox">
								<li className="block-operations__option" role="option">
									Turn into
								</li>
								<li className="block-operations__option" role="option">
									Color
								</li>
								<li className="block-operations__option" role="option">
									Copy link to block
								</li>
								<li className="block-operations__option" role="option">
									Duplicate
								</li>
								<li className="block-operations__option" role="option">
									Move to
								</li>
								<li className="block-operations__option" role="option">
									Delete
								</li>
								<li className="block-operations__option" role="option">
									Comment
								</li>
								<li className="block-operations__option" role="option">
									Suggest edits
								</li>
								<li className="block-operations__option" role="option">
									Ask AI
								</li>
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
