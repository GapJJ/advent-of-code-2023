

process.stdin.on('readable', () => {
	console.time("part2")
	let chunk;
	// Use a loop to make sure we read all available data. 
	while ((chunk = process.stdin.read()) !== null) {
		console.time("5")
		let raceArray = chunk.toString('utf8')
		raceArray = raceArray.split('\n');

		let raceMap = {}
		//parseRace(raceArray, raceMap)
		let kerningMap = {}
		kerningRace(raceArray, kerningMap)

		let possibleTimesArray = Object.values(kerningMap).map((raceArray) => determineQuad(raceArray))
		let result = possibleTimesArray.reduce((a, v) => a *= v)
		console.log(result)
		console.timeEnd("5")
	}
})

const determineValidPresses = (raceArray) => {

	let leftP = 0
	let rightP = raceArray[0]

	let lowestTime = -1
	let highestTime = -1
	while (leftP <= rightP) {
		console.log(leftP, rightP)
		if (lowestTime == -1) {
			if (checkSpeed(raceArray, leftP)) {
				lowestTime = leftP
			}
			else leftP++
		}
		if (highestTime == -1) {
			if (checkSpeed(raceArray, rightP)) {
				highestTime = rightP
			}
			else rightP--
			if (lowestTime >= 0 && highestTime >= 0) break
		}
	}
	return highestTime - lowestTime + 1
}

//v^2 - vt - d < 0
//solve for v to find the ranges
const determineQuad = (raceArray) => {
	let b = raceArray[0]
	let c = raceArray[1]
	let term = b ** 2 - (4 * c)
	let solutions = [
		(-b + (term) ** 0.5) / 2,
		(-b - (term) ** 0.5) / 2,
	]
	solutions = [Math.ceil(-solutions[0]), Math.floor(-solutions[1])]
	console.log(solutions)
	return solutions[1] - solutions[0] + 1
}
const checkSpeed = (raceArray, pressDuration) => {
	let travelTime = raceArray[0] - pressDuration
	if (pressDuration * travelTime > raceArray[1]) return true
	else return false

}
const parseRace = (raceArray, raceMap) => {

	let timeArray = raceArray[0].split(":")[1].split(" ")
	let times = []
	timeArray.map((time) => {
		time = time.trim()
		if (time.length > 0) {
			times.push(time)
		}
	})
	let distanceArray = raceArray[1].split(":")[1].split(" ")
	let distances = []
	distanceArray.map((distance) => {
		distance = distance.trim()
		if (distance.length > 0) {
			distances.push(parseInt(distance))
		}
	})


	for (let i = 0; i <= times.length - 1; i++) {
		raceMap[i] = [times[i], distances[i]]
	}
}

const kerningRace = (raceArray, raceMap) => {

	let timeArray = raceArray[0].split(":")[1].split(" ")
	let times = []
	timeArray.map((time) => {
		time = time.trim()
		if (time.length > 0) {
			times.push(time)
		}
	})
	let distanceArray = raceArray[1].split(":")[1].split(" ")
	let distances = []
	distanceArray.map((distance) => {
		distance = distance.trim()
		if (distance.length > 0) {
			distances.push(parseInt(distance))
		}
	})
	raceMap['0'] = [[times.join("")], distances.join("")]
}
