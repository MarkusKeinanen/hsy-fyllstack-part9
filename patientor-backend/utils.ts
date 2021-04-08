import { NewPatientEntry, Gender, HealthCheckRating, newHealthCheckEntry, newHospitalEntry } from './types';

type Fields = { name: unknown; dateOfBirth: unknown; gender: unknown; occupation: unknown; ssn: unknown };
export const toNewPatientEntry = ({ name, dateOfBirth, gender, occupation, ssn }: Fields): NewPatientEntry => {
	const newEntry: NewPatientEntry = {
		name: parseString(name),
		dateOfBirth: parseString(dateOfBirth),
		gender: parseGender(gender),
		occupation: parseString(occupation),
		ssn: parseString(ssn),
		entries: []
	};

	return newEntry;
};

export const toHealthCheckEntry = ({ description, date, specialist, diagnosisCodes, healthCheckRating }: newHealthCheckEntry) => {
	const newEntry: newHealthCheckEntry = {
		description: parseString(description),
		date: parseString(date),
		specialist: parseString(specialist),
		diagnosisCodes: parseStringArray(diagnosisCodes),
		healthCheckRating: parseHealthCheckRating(healthCheckRating),
		type: 'HealthCheck'
	};
	return newEntry;
};

type Discharge = {
	date: string;
	criteria: string;
};
export const toHospitalEntry = ({ description, date, specialist, diagnosisCodes, discharge }: newHospitalEntry) => {
	const newEntry: newHospitalEntry = {
		description: parseString(description),
		date: parseString(date),
		specialist: parseString(specialist),
		diagnosisCodes: parseStringArray(diagnosisCodes),
		discharge: parseDischarge(discharge),
		type: 'Hospital'
	};
	return newEntry;
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};
const isGender = (str: string): str is Gender => {
	return ['male', 'female', 'other'].includes(str);
};
const isHealthCheckRating = (num: any): num is HealthCheckRating => {
	return [0, 1, 2, 3].includes(num);
};
const isDischarge = (obj: any): obj is Discharge => {
	return obj && isString(obj.date) && isString(obj.criteria);
};
const isStringArray = (arr: unknown): arr is string[] => {
	if (!arr || !Array.isArray(arr) || arr.find((o) => !isString(o))) {
		return false;
	}
	return true;
};
const parseDischarge = (obj: any): Discharge => {
	if (!obj || !isDischarge(obj)) {
		throw new Error('Incorrect or missing discharge: ' + obj);
	}
	return obj;
};
const parseStringArray = (arr: unknown) => {
	if (!arr || !isStringArray(arr)) {
		throw new Error('Incorrect or missing string array: ' + arr);
	}
	return arr;
};
const parseHealthCheckRating = (str: HealthCheckRating): HealthCheckRating => {
	if (!str || !isHealthCheckRating(str)) {
		throw new Error('Incorrect or missing health check rating: ' + str);
	}
	return str;
};
const parseString = (str: unknown): string => {
	if (!str || !isString(str)) {
		throw new Error('Incorrect or missing string: ' + str);
	}
	return str;
};
const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};
