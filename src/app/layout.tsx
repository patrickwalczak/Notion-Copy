import { ReactNode } from 'react';
import './globals.scss';

export default async function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>{children}</body>
		</html>
	);
}
