import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { TextField, TypeOption, DiagnosisSelection, SelectField, NumberField } from '../AddPatientModal/FormField';
import { Entry, Diagnosis } from '../types';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
	diagnoses: Diagnosis[];
}

export const AddEntryForm = ({ diagnoses, onSubmit, onCancel }: Props) => {
	const typePool: TypeOption[] = [
		{ value: 'HealthCheck', label: 'Health check entry' }
		//{ value: 'Hospital', label: 'Hospital entry' }
	];
	const [selectedType, setSelectedType] = useState('HealthCheck');

	return (
		<Formik
			initialValues={{
				description: '',
				date: '',
				specialist: '',
				diagnosisCodes: [],
				type: 'HealthCheck'
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required';
				const errors: { [field: string]: string } = {};
				if (!values.description || !(typeof values.description === 'string')) {
					errors.description = requiredError;
				}
				if (!values.date || !(typeof values.date === 'string')) {
					errors.date = requiredError;
				}
				if (!values.specialist || !(typeof values.specialist === 'string')) {
					errors.specialist = requiredError;
				}
				if (!values.type || !(typeof values.type === 'string')) {
					errors.type = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldTouched, setFieldValue }) => {
				return (
					<Form className='form ui'>
						<Field label='Description' placeholder='description' name='description' component={TextField} />
						<Field label='Date' placeholder='YYYY-MM-DD' name='date' component={TextField} />
						<Field label='Specialist' placeholder='specialist' name='specialist' component={TextField} />
						<DiagnosisSelection diagnoses={diagnoses} setFieldTouched={setFieldTouched} setFieldValue={setFieldValue} />
						<SelectField
							label='Entry type'
							name='type'
							options={typePool}
							multiple={true}
							optionClick={(value) => {
								setSelectedType(value);
							}}
						/>
						{selectedType === 'HealthCheck' && (
							<Field label='healthCheckRating' name='healthCheckRating' component={NumberField} min={0} max={3} />
						)}
						<Grid>
							<Grid.Column floated='left' width={5}>
								<Button type='button' onClick={onCancel} color='red'>
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated='right' width={5}>
								<Button type='submit' floated='right' color='green' disabled={!dirty || !isValid}>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
