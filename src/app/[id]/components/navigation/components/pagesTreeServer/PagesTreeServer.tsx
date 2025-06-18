import { getPages } from '@/dummy';
import React from 'react';
import PagesTreeClient from '../pagesTreeClient/PagesTree';

const PagesTreeServer = async () => {
	const pages = await getPages();

	return <PagesTreeClient pages={pages} />;
};

export default PagesTreeServer;
