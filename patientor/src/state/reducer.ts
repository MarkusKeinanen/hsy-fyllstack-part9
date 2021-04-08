import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
	| { type: 'SET_PATIENT_LIST'; payload: Patient[] }
	| { type: 'ADD_PATIENT'; payload: Patient }
	| { type: 'ADD_ENTRY'; payload: { patient: Patient; entry: Entry } }
	| { type: 'UPDATE_PATIENT_DATA'; payload: Patient }
	| { type: 'SET_DIAGNOSES_LIST'; payload: Diagnosis[] };

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_DIAGNOSES_LIST':
			return {
				...state,
				diagnoses: action.payload
			};
		case 'SET_PATIENT_LIST':
			return {
				...state,
				patients: {
					...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
					...state.patients
				}
			};
		case 'ADD_PATIENT':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload
				}
			};
		case 'UPDATE_PATIENT_DATA':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: {
						...state.patients[action.payload.id],
						...action.payload
					}
				}
			};
		default:
			return state;
	}
};
