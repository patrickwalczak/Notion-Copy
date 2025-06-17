import '../index.scss';
import { getDevice } from '@/actions/cookies';
import { getPages } from '@/dummy';
import NavigationClient from '../NavigationClient';

export default async function NavigationController() {
	const device = await getDevice();
	const pages = await getPages();

	return <NavigationClient device={device} pages={pages} />;
}
