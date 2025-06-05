import { ReactNode } from 'react';
import '../styles/base.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>{children}</body>
		</html>
	);
}
