import React from 'react';

import { CoursePart } from '../types';

interface MyProps {
	courseParts: CoursePart[];
}

const Total = ({ courseParts }: MyProps): JSX.Element => {
	return <p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>;
};

export default Total;
