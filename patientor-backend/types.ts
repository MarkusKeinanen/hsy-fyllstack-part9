interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	diagnosisCodes?: string[];
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type newHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type newHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewEntry = newHealthCheckEntry | newHospitalEntry;

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	gender: string;
	ssn: string;
	occupation: string;
	entries: Entry[];
}
export type FilteredPatient = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female'
}
