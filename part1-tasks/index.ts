import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

app.get('/ping', (_req, res) => {
	res.send('pong');
});

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const weight = req.query.weight;
	const height = req.query.height;
	if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
		const bmi = calculateBmi(Number(weight), Number(height));
		res.send(bmi);
	} else {
		res.send({
			error: 'malformatted parameters'
		});
	}
});

app.post('/exercises', (req, res) => {
	const daily_exercises = req.body.daily_exercises;
	const target = req.body.target;
	if (!daily_exercises || !target) {
		res.send({
			error: 'parameters missing'
		});
		return;
	}
	if (isNaN(target) || !Array.isArray(daily_exercises)) {
		res.send({
			error: 'malformatted parameters'
		});
		return;
	}
	const result = calculateExercises(daily_exercises, Number(target));
	res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
