import patients from '../data/patientsData';
import { v1 as uuid } from 'uuid';

import { Patient, FilteredPatient, NewPatientEntry, Entry, NewEntry } from '../types';

const getEntries = (): FilteredPatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries
	}));
};

const getNonSensitiveEntries = (): Patient[] => {
	return patients;
};

const addEntry = (entry: NewPatientEntry): Patient => {
	const newEntry: Patient = {
		id: uuid(),
		...entry
	};
	patients.push(newEntry);
	return newEntry;
};

const addPatientEntry = (patient: Patient, entry: NewEntry): Entry => {
	const newEntry: Entry = {
		id: uuid(),
		...entry
	};
	patients.forEach((p) => {
		if (p.id === patient.id) {
			p.entries.push(newEntry);
		}
	});
	return newEntry;
};

const findById = (id: string): Patient | undefined => {
	const entry: Patient | undefined = patients.find((d) => d.id === id);
	if (!entry) return undefined;
	return {
		id: entry.id,
		name: entry.name,
		dateOfBirth: entry.dateOfBirth,
		gender: entry.gender,
		occupation: entry.occupation,
		entries: entry.entries,
		ssn: entry.ssn
	};
};

export default {
	getEntries,
	getNonSensitiveEntries,
	addEntry,
	addPatientEntry,
	findById
};
