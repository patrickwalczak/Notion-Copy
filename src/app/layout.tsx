import { ReactNode } from 'react';
import '../styles/globals.scss';

export default async function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>{children}</body>
		</html>
	);
}
