import React from 'react';
import styles from './styles.module.scss';

const BlockOperations = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.dialog} role="dialog" aria-modal="true">
					<div className={styles.dialogContent}>
						<div className={styles.header}>
							<div className={styles.searchContainer}>
								<div className={styles.searchBox}>
									<input
										placeholder="Search actions…"
										type="text"
										className={styles.input}
										role="combobox"
										aria-expanded="true"
										aria-haspopup="listbox"
										aria-controls="listbox"
										aria-activedescendant=":r4l:"
									/>
								</div>
							</div>
						</div>

						<div className={styles.scroller}>
							<div className={styles.listboxHeader}>To-do list</div>

							<ul className={styles.listbox} id="listbox" role="listbox">
								<li className={styles.option} role="option">
									Turn into
								</li>
								<li className={styles.option} role="option">
									Color
								</li>
								<li className={styles.option} role="option">
									Copy link to block
								</li>
								<li className={styles.option} role="option">
									Duplicate
								</li>
								<li className={styles.optionActive} role="option">
									Move to
								</li>
								<li className={styles.option} role="option">
									Delete
								</li>
								<li className={styles.option} role="option">
									Comment
								</li>
								<li className={styles.option} role="option">
									Suggest edits
								</li>
								<li className={styles.option} role="option">
									Ask AI
								</li>
							</ul>

							<div className={styles.footer}>
								<div className={styles.editedBy}>Last edited by Jane Doe</div>
								<div className={styles.timestamp}>Yesterday at 9:50 PM</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlockOperations;
