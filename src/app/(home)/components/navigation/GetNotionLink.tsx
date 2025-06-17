import React from 'react';
import Link from 'next/link';

const GetNotionLink = () => {
	return (
		<Link href={'/signup'} className="buttonLikeLink buttonLikeLink--blue buttonLikeLink--regular shadow-100">
			Sign up
		</Link>
	);
};

export default GetNotionLink;
