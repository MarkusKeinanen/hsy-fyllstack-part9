export const calculateBmi = (height: number, weight: number) => {
	let str = '';
	let bmi = weight / (((height / 100) * height) / 100);
	if (bmi < 18.5) str = 'Underweight';
	if (bmi >= 18.5 && bmi <= 25) str = 'Normal (healthy weight)';
	if (bmi >= 25 && bmi <= 30) str = 'Overweight';
	if (bmi > 30) str = 'Obese';
	return {
		height,
		weight,
		bmi: str
	};
};

//COMMAND LINE USE (TASKS 9.1-9.3):

// interface HeightWeight {
// 	height: number
// 	weight: number
// }
// const parseArguments = (args: Array<string>): HeightWeight => {
// 	if (args.length < 4) throw new Error('Not enough arguments')
// 	if (args.length > 4) throw new Error('Too many arguments')

// 	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
// 		return {
// 			height: Number(args[2]),
// 			weight: Number(args[3])
// 		}
// 	} else {
// 		throw new Error('Provided values were not numbers!')
// 	}
// }
// const calculateBmi = (height: number, weight: number) => {
// 	let str = ''
// 	let bmi = weight / (((height / 100) * height) / 100)
// 	if (bmi < 18.5) str = 'Underweight'
// 	if (bmi >= 18.5 && bmi <= 25) str = 'Normal (healthy weight)'
// 	if (bmi >= 25 && bmi <= 30) str = 'Overweight'
// 	if (bmi > 30) str = 'Obese'
// 	return str
// }

// try {
// 	const { height, weight } = parseArguments(process.argv)
// 	console.log(calculateBmi(height, weight))
// } catch (e) {
// 	console.log('Error, something bad happened, message: ', e.message)
// }
