import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toHealthCheckEntry, toHospitalEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const newPatient = patientService.addEntry(newPatientEntry);
		res.json(newPatient);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);
	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post('/:id/entries', (req, res) => {
	const patient = patientService.findById(req.params.id);
	if (!patient) {
		res.sendStatus(404);
		return;
	}
	try {
		let newEntry = null;
		switch (req.body.type) {
			case 'HealthCheck':
				newEntry = toHealthCheckEntry(req.body);
				break;
			case 'Hospital':
				newEntry = toHospitalEntry(req.body);
				break;
			default:
				throw new Error('Invalid entry type: ' + req.body.type);
		}
		const addedEntry = patientService.addPatientEntry(patient, newEntry);
		res.json(addedEntry);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

export default router;
