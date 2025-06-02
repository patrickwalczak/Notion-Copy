import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { NavigationContext } from '../Navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const ExpandMenu = () => {
	const { isOpen } = useContext(NavigationContext);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					key="panel"
					initial={{ y: '-100%' }}
					animate={{ y: '0%' }}
					transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
					className={`${styles.expandMenu} flex-column justify-between p-y-150 p-x-1`}
				>
					<motion.ul
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: 'easeIn', delay: 0.4 }}
						className={`${styles.list} flex-column gap-050`}
					>
						<li>
							<button className={`flex-align-center gap-050 button-empty`}>Notion</button>
						</li>
						<li>
							<Link href={'/'} className={`button-empty flex-align-center gap-050`}>
								Mail
							</Link>
						</li>
						<li>
							<Link href={'/'} className={`button-empty flex-align-center gap-050`}>
								Calendar
							</Link>
						</li>
						<li>
							<Link href={'/'} className={`button-empty flex-align-center gap-050`}>
								AI
							</Link>
						</li>
						<li>
							<Link href={'/'} className={`button-empty flex-align-center gap-050`}>
								Enterprise
							</Link>
						</li>
						<li>
							<Link href={'/'} className={`button-empty flex-align-center gap-050`}>
								Pricing
							</Link>
						</li>
						<li>
							<button className={`flex-align-center gap-050 button-empty`}>More</button>
						</li>
					</motion.ul>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: 'easeIn', delay: 0.5 }}
						className={`${styles.bottomLinks} flex-column gap-1`}
					>
						<Link
							href={'/'}
							className={`${styles.downloadLink} rounded p-x-075 p-y-025 font-500 buttonSizeL text-white`}
						>
							Download app
						</Link>
						<Link href={'/'} className={`${styles.loginLink} rounded p-x-075 p-y-025 font-500 buttonSizeL`}>
							Log in
						</Link>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ExpandMenu;
