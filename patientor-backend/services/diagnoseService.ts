import diagnoses from '../data/diagnosesData';

import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
	return diagnoses;
};

const addEntry = () => {
	return [];
};

export default {
	getEntries,
	addEntry
};
