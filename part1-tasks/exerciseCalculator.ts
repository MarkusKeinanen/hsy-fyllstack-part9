interface CalcResult {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

export const calculateExercises = (trainingHours: Array<number>, target: number): CalcResult => {
	let total = 0;
	trainingHours.forEach((hr) => (total += hr));
	let avg = total / trainingHours.length;
	let msg = '';
	let rating = 0;
	if (avg > 0 && avg < target - 1) {
		msg = 'Quite bad. Do better!';
		rating = 1;
	} else if (avg >= target - 1 && avg < target) {
		msg = 'Getting there. Keep pushing!';
		rating = 2;
	} else if (avg >= target) {
		rating = 3;
		msg = 'Youre better than average! Good job.';
	}
	return {
		periodLength: trainingHours.length,
		trainingDays: trainingHours.filter((h) => h > 0).length,
		target: target,
		average: avg,
		success: rating >= 3,
		rating: rating,
		ratingDescription: msg
	};
};

//COMMAND LINE VERSION /tasks 9.1-9.3
// export const calculate = (trainingHours: Array<number>, target: number) => {
// 	let total = 0
// 	trainingHours.forEach((hr) => (total += hr))
// 	let avg = total / trainingHours.length
// 	let msg = ''
// 	let rating = 0
// 	if (avg > 0 && avg < target - 1) {
// 		msg = 'Quite bad. Do better!'
// 		rating = 1
// 	} else if (avg >= target - 1 && avg < target) {
// 		msg = 'Getting there. Keep pushing!'
// 		rating = 2
// 	} else if (avg >= target) {
// 		rating = 3
// 		msg = 'Youre better than average! Good job.'
// 	}
// 	console.log({
// 		periodLength: trainingHours.length,
// 		trainingDays: trainingHours.filter((h) => h > 0).length,
// 		target: target,
// 		average: avg,
// 		success: rating >= 3,
// 		rating: rating,
// 		ratingDescription: msg
// 	})
// }
// interface ExerciseParams {
// 	exerciseHours: Array<number>
// 	target: number
// }
// const parseArguments = (args: Array<string>): ExerciseParams => {
// 	if (args.length < 4) throw new Error('Not enough arguments')
// 	let hrs = []
// 	for (let i = 3; i < args.length; i++) {
// 		hrs.push(Number(args[i]))
// 	}
// 	return {
// 		exerciseHours: hrs,
// 		target: Number(args[2])
// 	}
// }
// try {
// 	const parsedArgs = parseArguments(process.argv)
// 	calculate(parsedArgs.exerciseHours, parsedArgs.target)
// } catch (e) {
// 	console.log('Error, something bad happened, message: ', e.message)
// }
