
const parseText = (fullString, gamesDict) => {

	let sum = 0

	let you = fullString.charAt(fullString.length - 1)
	//sicsors
	if (you == 'Z') sum += 3
	//rock
	if (you == 'X') sum += 1
	//paper
	if (you == 'Y') sum += 2

	let them = fullString.charAt(0)
	if (them == 'A') {

		if (you == 'Y') sum += 6
		if (you == 'X') sum += 3
		if (you == 'Z') sum += 0
	}
	//rock
	if (them == 'B') {

		if (you == 'Y') sum += 3
		if (you == 'X') sum += 0
		if (you == 'Z') sum += 6
	}//paper
	if (them == 'C') {

		if (you == 'Y') sum += 0
		if (you == 'X') sum += 6
		if (you == 'Z') sum += 3
	}//sciosrs

	return sum
}//paper
process.stdin.on('readable', () => {
	let chunk;
	// Use a loop to make sure we read all available data. 
	while ((chunk = process.stdin.read()) !== null) {

		let gamesArray = chunk.toString('utf8')
		let sum = 0

		gamesArray.split('\n').forEach((x) => sum += parseText(x))

		process.stdout.write(`data: ${sum}`);
	}
});

