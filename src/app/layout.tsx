import AppContextProvider from '@/context/AppContext';
import './globals.scss';
import Navigation from '@/components/navigation/Navigation';
import App from 'next/app';
import AppWrapper from '@/components/appWrapper/AppWrapper';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AppContextProvider>
					<AppWrapper>
						<Navigation />
						<main>{children}</main>
					</AppWrapper>
				</AppContextProvider>
			</body>
		</html>
	);
}
