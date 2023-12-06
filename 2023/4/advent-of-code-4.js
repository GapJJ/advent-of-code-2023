const parseCard = (cardLine) => {
	let game = cardLine.split(":")[0]
	let cards = cardLine.split(":")[1].trim()

	let winningCardArray = cards.split("|")[0].trim()
	winningCardArray = winningCardArray.replace("  ", " ")
	winningCardArray = winningCardArray.replace("  ", " ")
	winningCardArray = winningCardArray.split(" ")
	let myNumbers = cards.split("|")[1].trim()

	myNumbers = myNumbers.replace("   ", "  ")
	myNumbers = myNumbers.replace("  ", " ")
	myNumbers = myNumbers.replace("  ", " ")
	myNumbers = myNumbers.split(" ")
	let counter = -1
	for (let number of myNumbers) {


		if (winningCardArray.includes(number.trim()) && number != "") {

			counter++
		}
	}
	if (counter == -1) return 0
	else return 2 ** parseInt(counter)
}

process.stdin.on('readable', () => {
	console.time("part2")
	let chunk;
	// Use a loop to make sure we read all available data. 
	while ((chunk = process.stdin.read()) !== null) {

		let cardCountMap = { '1': 1 }
		let gamesArray = chunk.toString('utf8')

		let sum = 0
		gamesArray = gamesArray.split('\n');
		for (let i = 0; i < gamesArray.length - 1; i++) {
			//sum += parseCard(gamesArray[i], i + 1)
			parseCardCopy(gamesArray[i], i + 1, cardCountMap)

		}


		let totalCards = Object.values(cardCountMap).reduce((a, v) => a += v)
		console.log(totalCards)
		console.timeEnd("part2")
		return sum

	}
})

const parseCardCopy = (cardLine, gameId, cardCountMap) => {
	let game = cardLine.split(":")[0]
	game = game.split(" ")[1]
	let cards = cardLine.split(":")[1].trim()

	let winningCardArray = cards.split("|")[0].trim()
	winningCardArray = winningCardArray.replace("  ", " ")
	winningCardArray = winningCardArray.replace("  ", " ")
	winningCardArray = winningCardArray.split(" ")
	let myNumbers = cards.split("|")[1].trim()

	myNumbers = myNumbers.replace("   ", "  ")
	myNumbers = myNumbers.replace("  ", " ")
	myNumbers = myNumbers.replace("  ", " ")
	myNumbers = myNumbers.split(" ")
	let counter = 0


	for (let number of myNumbers) {


		if (winningCardArray.includes(number.trim()) && number != "") {

			counter++
		}
	}

	if (cardCountMap[gameId] == undefined) cardCountMap[gameId] = 1
	for (let i = gameId + 1; i <= gameId + counter; i++) {
		cardCountMap[i] ? cardCountMap[i] += cardCountMap[gameId] : cardCountMap[i] = cardCountMap[gameId] + 1
	}


}

