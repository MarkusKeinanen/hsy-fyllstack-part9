import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue, setPatientList, setDiagnosesList } from './state';
import { Diagnosis, Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientPage from './PatientPage';

const App = () => {
	const [, dispatch] = useStateValue();
	React.useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			try {
				const res = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
				const patientListFromApi: Patient[] = res.data;
				dispatch(setPatientList(patientListFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatientList();
	}, [dispatch]);

	React.useEffect(() => {
		const fetchDiagnosesList = async () => {
			try {
				const res = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
				const diagnosesFromApi: Diagnosis[] = res.data;
				dispatch(setDiagnosesList(diagnosesFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		void fetchDiagnosesList();
	}, []);

	return (
		<div className='App'>
			<Router>
				<Container>
					<Header as='h1'>Patientor</Header>
					<Button as={Link} to='/' primary>
						Home
					</Button>
					<Divider hidden />
					<Switch>
						<Route path='/patients/:id'>
							<PatientPage />
						</Route>
						<Route path='(|/patients)'>
							<PatientListPage />
						</Route>
					</Switch>
				</Container>
			</Router>
		</div>
	);
};

export default App;
