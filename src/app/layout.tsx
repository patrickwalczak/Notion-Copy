import { ReactNode } from 'react';
import '../styles/globals.scss';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body>
				<ThemeProvider attribute={'class'} enableSystem defaultTheme="system">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
