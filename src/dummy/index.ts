import { dummyPages } from './pages';

export const createPageInDb = async (page) => dummyFetch(page);

const dummyFetch = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 500));

export const getPage = (id) =>
	new Promise((resolve) => setTimeout(() => resolve(dummyPages.find((page) => page.id === id)), 4000));

export const getPages = () => new Promise((resolve) => setTimeout(() => resolve(dummyPages), 100));
