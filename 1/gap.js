const numMap = {
	"one": 1,
	"two": 2,
	"three": 3,
	"four": 4,
	"five": 5,
	"six": 6,
	"seven": 7,
	"eight": 8,
	"nine": 9
}
process.stdin.on('readable', () => {
	let chunk;
	// Use a loop to make sure we read all available data. 
	while ((chunk = process.stdin.read()) !== null) {
		let sum = 0

		let elfArray = chunk.toString('utf8')


		elfArray = elfArray.split('\n');
		for (let i = 0; i < elfArray.length - 1; i++) {
			let line = elfArray[i]
			let low = findNumLow(line)
			let high = findNumHigh(line)
			console.log(line, "||", low, "||", high)
			sum += parseInt(parseInt(findNumLow(line).toString() + findNumHigh(line).toString()))

		}
		process.stdout.write(`data: ${sum}`);
	}
});

const sortDesc = (a, b) => {
	return b - a
}

const findNumLow = (string) => {
	let right = 0
	while (right < string.length && (string.charCodeAt(right) < 48 || string.charCodeAt(right) > 57)) {
		let left = right - 1
		while (left >= 0) {
			if (numMap[string.slice(left, right + 1)]) {
				return numMap[string.slice(left, right + 1)].toString()
			}
			left--
		}
		right++
	}
	if (string.charCodeAt(right) >= 48 && string.charCodeAt(right) <= 57) {
		return string.charAt(right).toString()
	} else return "0"
}
const findNumHigh = (string) => {
	let right = string.length - 1
	let left = right
	while (right >= 0 && (string.charCodeAt(right) < 48 || string.charCodeAt(right) > 57)) {
		left = right - 1
		while (left >= 0 && (string.charCodeAt(left) > 57 || string.charCodeAt(left) < 48)) {
			if (numMap[string.slice(left, right + 1)]) {
				return numMap[string.slice(left, right + 1)].toString()
			}
			left--
		}
		right--
	}
	if (string.charCodeAt(left) >= 48 && string.charCodeAt(left) <= 57) {
		return string.charAt(left).toString()
	} else return "0"
}


