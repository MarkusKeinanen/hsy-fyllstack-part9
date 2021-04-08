import React from 'react';

import { CoursePart, assertNever } from '../types';

interface MyProps {
	courseParts: CoursePart[];
}

const Part = ({ courseParts }: MyProps): JSX.Element => {
	const coursePartsParsed = courseParts.map((part) => {
		let elem = null;
		switch (part.type) {
			case 'normal':
				elem = (
					<div>
						<div>{part.description}</div>
					</div>
				);
				break;
			case 'submission':
				elem = (
					<div>
						<div>{part.description}</div>
						<div>Submit to: {part.exerciseSubmissionLink}</div>
					</div>
				);
				break;
			case 'groupProject':
				elem = (
					<div>
						<div>Group project count: {part.groupProjectCount}</div>
					</div>
				);
				break;
			case 'special':
				elem = (
					<div>
						<div>{part.description}</div>
						<div>required skills: {part.requirements.join(',')}</div>
					</div>
				);
				break;
			default:
				return assertNever(part);
		}
		return {
			elem,
			part
		};
	});

	return (
		<div>
			{coursePartsParsed.map((parsedPart) => {
				const { part, elem } = parsedPart;
				return (
					<div key={part.name}>
						<h3>
							{part.name} (exercises: {part.exerciseCount})
						</h3>
						{elem}
					</div>
				);
			})}
		</div>
	);
};

export default Part;
