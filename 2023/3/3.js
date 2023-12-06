
process.stdin.on('readable', () => {
	let chunk;
	// Use a loop to make sure we read all available data. 
	while ((chunk = process.stdin.read()) !== null) {

		let gamesArray = chunk.toString('utf8')
		addNumers(gamesArray)
		findGearRatio(gamesArray)
	}
});

const findGearRatio = (gamesArray) => {

	let digitMap = {}
	let gearMap = {}
	let digitIdentifierMap = {}
	gamesArray = gamesArray.split('\n');
	gamesArray.pop()
	gamesArray = gamesArray.map((row) => {
		return "." + row + "."
	})
	gamesArray = gamesArray.map((x) => x.split(""))
	let blankArray = new Array(gamesArray[0].length).fill(".")
	gamesArray.unshift(blankArray)
	gamesArray.push(blankArray)

	let digitIdentifier = 0
	for (let i = 0; i < gamesArray.length; i++) {
		let digitStart = -1
		for (let j = 0; j < gamesArray[i].length; j++) {
			if (gamesArray[i][j].charCodeAt(0) == 42) {

				gearMap[[i, j]] = true
			}
			if (gamesArray[i][j].charCodeAt(0) < 48 || gamesArray[i][j].charCodeAt(0) > 57) {

				if (digitStart != -1) {
					let sum = 0
					let counter = 0
					for (let t = j - 1; t >= digitStart; t--) {
						sum += parseInt(gamesArray[i][t]) * (10 ** counter)
						digitMap[[i, t]] = digitIdentifier
						counter++
					}
					digitIdentifierMap[digitIdentifier] = sum
					digitIdentifier += 1
				}
				digitStart = -1
			} else {
				if (digitStart == -1) {
					digitStart = j
				}
			}

		}
	}
	let gearSum = 0
	Object.keys(gearMap).map((gearCoordinates) => {
		let surrounding = []
		let coordinates = gearCoordinates.split(",").map((x) => parseInt(x))
		for (let i = coordinates[0] - 1; i <= coordinates[0] + 1; i++) {
			for (let j = coordinates[1] - 1; j <= coordinates[1] + 1; j++) {
				if (digitMap[[i, j]]) surrounding.push(digitMap[[i, j]])
			}
		}
		let set = new Set(surrounding)
		if (set.size == 2) {
			digitIdArray = [...set.values()]
			let product = digitIdentifierMap[digitIdArray[0]] * digitIdentifierMap[digitIdArray[1]]
			gearSum += product
		}
		console.log(set)
	})
	console.log(gearSum)


}
const addNumers = (gamesArray) => {
	let digitMap = {}
	gamesArray = gamesArray.split('\n');
	gamesArray.pop()
	gamesArray = gamesArray.map((row) => {
		return "." + row + "."
	})
	gamesArray = gamesArray.map((x) => x.split(""))
	let blankArray = new Array(gamesArray[0].length).fill(".")
	gamesArray.unshift(blankArray)
	gamesArray.push(blankArray)
	for (let i = 0; i < gamesArray.length; i++) {
		let digitStart = -1
		for (let j = 0; j < gamesArray[i].length; j++) {
			if (gamesArray[i][j].charCodeAt(0) < 48 || gamesArray[i][j].charCodeAt(0) > 57) {

				if (digitStart != -1) {
					let sum = 0
					let counter = 0
					for (let t = j - 1; t >= digitStart; t--) {
						sum += parseInt(gamesArray[i][t]) * (10 ** counter)
						counter++
					}
					if (digitMap[sum]) digitMap[sum].push([i, digitStart, j])
					else digitMap[sum] = [[i, digitStart, j]]
				}
				digitStart = -1
			} else {
				if (digitStart == -1) {
					digitStart = j
				}
			}
		}
	}

	let sum = 0
	Object.keys(digitMap).map((digitKey) => {
		digitMap[digitKey].map((coordinates) => {

			if (checkValid(coordinates, gamesArray)) {
				sum += parseInt(digitKey)
			}
		})


	})
	console.log(sum)


}

const checkValid = (coordinates, gamesArray) => {
	for (let i = coordinates[0] - 1; i <= coordinates[0] + 1; i++) {
		for (let j = coordinates[1] - 1; j <= coordinates[2]; j++) {
			//console.log(coordinates)
			//console.log(gamesArray[i][j])
			let char = gamesArray[i][j].charCodeAt(0)
			if (char != 46 && (char < 48 || char > 57)) {
				return true
			}
		}
	}
	return false


}

