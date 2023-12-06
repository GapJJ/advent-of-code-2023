const parseText = (fullString, gamesDict) => {
	let wordArray = fullString.split(" ")
	const gameId = wordArray[1]
	let bagString = wordArray.slice(2)
	balls = gameId.slice(4)

	const ballCountMap = {
		"blue": 0,
		"red": 0,
		"green": 0,
	}
	gamesDict[gameId.slice(0, gameId.length - 1)] = getMinimum(bagString, ballCountMap)
}


const gameDict = {}
const ballRules = {
	blue: 14,
	green: 13,
	red: 12
}
function parseGame(gameString, ballCountMap) {
	for (i = 0; i < gameString.length; i += 2) {
		colorString = gameString[i + 1]
		if (colorString.charAt(colorString.length - 1) == ';') {
			colorString = colorString.slice(0, colorString.length - 1)
			ballCountMap[colorString] += parseInt(gameString[i])

			let isOk = Object.keys(ballCountMap).every((color) => {
				return ballCountMap[color] <= ballRules[color]
			})
			if (!isOk) {
				return false
			}

			Object.keys(ballCountMap).forEach((x) => {
				ballCountMap[x] = 0
			})
		} else if (colorString.charAt(colorString.length - 1) == ',') {
			colorString = colorString.slice(0, colorString.length - 1)
			ballCountMap[colorString] += parseInt(gameString[i])

		} else {
			colorString = gameString[i + 1]
			ballCountMap[colorString] += parseInt(gameString[i])
		}

	}
	let isOk = Object.keys(ballCountMap).every((color) => ballCountMap[color] <= ballRules[color])
	if (!isOk) {
		return false
	}
	return true

} function getMinimum(gameString, ballCountMap) {
	const minimumCountMap = {
		"blue": 0,
		"red": 0,
		"green": 0
	}
	for (i = 0; i < gameString.length; i += 2) {
		colorString = gameString[i + 1]
		if (colorString.charAt(colorString.length - 1) == ';') {
			colorString = colorString.slice(0, colorString.length - 1)
			ballCountMap[colorString] += parseInt(gameString[i])


			Object.keys(ballCountMap).forEach((x) => {
				minimumCountMap[x] = Math.max(ballCountMap[x], minimumCountMap[x])
			})

			Object.keys(ballCountMap).forEach((x) => {
				ballCountMap[x] = 0
			})
		} else if (colorString.charAt(colorString.length - 1) == ',') {
			colorString = colorString.slice(0, colorString.length - 1)
			ballCountMap[colorString] += parseInt(gameString[i])

		} else {
			colorString = gameString[i + 1]
			ballCountMap[colorString] += parseInt(gameString[i])
		}

	}


	Object.keys(ballCountMap).forEach((x) => {
		minimumCountMap[x] = Math.max(ballCountMap[x], minimumCountMap[x])
	})
	let sum = 1
	Object.keys(ballCountMap).forEach((x) => sum = sum * minimumCountMap[x])
	return sum

}



process.stdin.on('readable', () => {
	let chunk;
	const gamesMap = {}
	// Use a loop to make sure we read all available data. 
	while ((chunk = process.stdin.read()) !== null) {

		let gamesArray = chunk.toString('utf8')


		gamesArray = gamesArray.split('\n');
		for (let i = 0; i < gamesArray.length - 1; i++) {
			parseText(gamesArray[i], gamesMap)
		}

		console.log(gamesMap)
		let firstsum = 0
		let possibleGameKeyArray = Object.keys(gamesMap).filter((x) => gamesMap[x])
		for (let gameKey of possibleGameKeyArray)
			//sum = sum.reduce((a, v) => a += parseInt(v))
			firstsum += parseInt(gameKey)
		secondsum = 0
		for (let gameKey of Object.keys(gamesMap)) secondsum += gamesMap[gameKey]
		console.log(secondsum)
		process.stdout.write(`data: ${secondsum}`);
	}
});

