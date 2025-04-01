import AppContextProvider from '@/context/AppContext';
import './globals.scss';
import Navigation from '@/components/navigation/Navigation';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AppContextProvider>
					<Navigation />
					<main>{children}</main>
				</AppContextProvider>
			</body>
		</html>
	);
}
