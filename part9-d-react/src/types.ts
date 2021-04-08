export interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}
export interface CoursePartBaseWithDescription extends CoursePartBase {
	description: string;
}

export interface CourseNormalPart extends CoursePartBaseWithDescription {
	type: 'normal';
}

export interface CourseSubmissionPart extends CoursePartBaseWithDescription {
	type: 'submission';
	exerciseSubmissionLink: string;
}

export interface CourseProjectPart extends CoursePartBase {
	type: 'groupProject';
	groupProjectCount: number;
}

export interface CourseSpecialPart extends CoursePartBaseWithDescription {
	type: 'special';
	requirements: string[];
}

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
	throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
