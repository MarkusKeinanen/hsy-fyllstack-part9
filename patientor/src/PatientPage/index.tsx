import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, updatePatient } from '../state';
import { Gender, Patient, assertNever, Diagnosis, Entry } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Card, Button } from 'semantic-ui-react';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const getGenderIcon = (gender: Gender): string => {
	if (gender === Gender.Female) {
		return 'venus';
	} else if (gender === Gender.Male) {
		return 'mars';
	} else {
		return 'genderless';
	}
};

const PatientPage = () => {
	const [{ patients, diagnoses }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();
	const openModal = (): void => setModalOpen(true);
	const closeModal = (): void => {
		setModalOpen(false);
	};

	const patient = patients[id];

	React.useEffect(() => {
		const operation = async () => {
			if (patient && !patient.ssn) {
				try {
					const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
					const fetchedPatient: Patient = res.data;
					dispatch(updatePatient(fetchedPatient));
				} catch (e) {
					console.error(e);
					setError(e.response?.data?.error || 'Unknown error');
				}
			}
		};
		void operation();
	}, [dispatch, patients, patient]);

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const res = await axios.post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, values);
			const newEntry = res.data;
			const newPatient = {
				...patient
			};
			newPatient.entries.push(newEntry);
			dispatch(updatePatient(newPatient));
			closeModal();
		} catch (e) {
			console.error(e.response?.data || 'Unknown Error');
		}
	};

	if (!patient) return <div>Ei potilasta tällä ID:llä</div>;

	return (
		<div>
			<h2>
				{patient.name} <i className={`${getGenderIcon(patient.gender)} icon`}></i>
			</h2>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<p>dateOfBirth: {patient.dateOfBirth}</p>
			<h4>Entries:</h4>
			{patient.entries.map((entry) => {
				let specificEntryData = null;
				switch (entry.type) {
					case 'HealthCheck':
						specificEntryData = <Card.Description>Health check rating: {entry.healthCheckRating}</Card.Description>;
						break;
					case 'Hospital':
						specificEntryData = (
							<Card.Description>
								<div>
									Discharge: {entry.discharge.date} - {entry.discharge.criteria}
								</div>
							</Card.Description>
						);
						break;
					case 'OccupationalHealthcare':
						specificEntryData = (
							<Card.Description>
								<div>Employer: {entry.employerName}</div>
								<div>{entry.sickLeave && `${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}</div>
							</Card.Description>
						);
						break;
					default:
						return assertNever(entry);
				}
				return (
					<Card key={entry.id}>
						<Card.Content>
							<Card.Header> {entry.date}</Card.Header>
							<Card.Meta>
								<span className='date'>{entry.description}</span>
							</Card.Meta>
							<Card.Description>Specialist: {entry.specialist}</Card.Description>
							<Card.Description>
								Diagnosis codes:
								{entry.diagnosisCodes && (
									<ul>
										{entry.diagnosisCodes.map((code) => {
											const diagnosis: Diagnosis | undefined = diagnoses.find((d) => d.code === code);
											if (!diagnosis) return <li key={entry.id + code}>{code}</li>;
											return (
												<li key={entry.id + code}>
													{code} {diagnosis.latin && diagnosis.latin} - {diagnosis.name}
												</li>
											);
										})}
									</ul>
								)}
							</Card.Description>
							{specificEntryData}
						</Card.Content>
					</Card>
				);
			})}
			<AddEntryModal diagnoses={diagnoses} modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
			<Button onClick={() => openModal()}>Add New Entry</Button>
		</div>
	);
};
export default PatientPage;
