import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

var cors = require('cors');
const router = express();
router.use(cors());
router.use(express.json());
router.use(
	express.urlencoded({
		extended: true
	})
);

router.get('/api/ping', (_req, res) => {
	res.send('pong');
});

router.use('/api/diagnoses', diagnosesRouter);
router.use('/api/patients', patientsRouter);

const PORT = 3001;

router.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
