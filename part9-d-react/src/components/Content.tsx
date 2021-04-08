import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface MyProps {
	courseParts: CoursePart[];
}

const Content = ({ courseParts }: MyProps): JSX.Element => {
	return (
		<div>
			<Part courseParts={courseParts} />
		</div>
	);
};

export default Content;
