
process.stdin.on('readable', () => {
	console.time("part2")
	let chunk;
	// Use a loop to make sure we read all available data. 
	while ((chunk = process.stdin.read()) !== null) {

		let mapArray = chunk.toString('utf8')
		let mapMap = {}
		mapArray = mapArray.split('\n\n');

		let seedArray = parseMap(mapMap, mapArray)
		findLowest(mapMap)

		//let seedRangeArray = generateSeedRanges(seedArray)
		//Object.keys(seedRangeArray).map((seed) => {
		//  Ob      seedRangeArray[seed] = generateConversion(seed, mapMap)
		//})Ob
		//
		//

		//let locationArray = seedRangeArray.map((seed) => {

		//	for (let mapType of Object.keys(mapMap)) {
		//		seed = generateConversion(seed, mapMap[mapType])
		//	}
		//	return seed
		//})
		//locationArray.sort((a, b) => a - b)

	}
})
const findMaxOfMap = (mapMap) => {
	Object.getOwnPropertyNames(mapMap).map((mapType) => {
		mapMap[mapType].map((mapArray) => {

		})
	})
}
const generateSeedRanges = (seedArray) => {
	let rangeMap = {}
	for (let i = 0; i <= seedArray.length - 2; i += 2) {
		for (let j = parseInt(seedArray[i]); j < parseInt(seedArray[i]) + parseInt(seedArray[i + 1]) - 1; j++) {
			rangeMap[j] = true
		}
	}
	return Object.getOwnPropertyNames(rangeMap)
}

const findLowest = (mapMap) => {
	let lowestMap = {}
	for (let mapType of Object.keys(mapMap)) {
		let rangesArray = mapMap[mapType]
		let biggestOffset = 0
		for (let i = 0; i < rangesArray.length - 1; i++) {
			let offset = rangesArray[i][1] - rangesArray[i][0]
			if (offset > biggestOffset) {
				biggestOffset = offset
				lowestMap[mapType] = rangesArray[i]
			}
		}
	}
	console.log(lowestMap)
}
const parseMap = (mapMap, mapString) => {
	let mapKey = 0
	let MapKeyIndex = 0
	let seeds = mapString[0].split(": ")[1].trim()
	seeds = seeds.split(" ")
	for (let i = 1; i < mapString.length; i++) {
		let mapNumberArray = mapString[i].split(":")[1].trim().split("\n")
		mapNumberArray = mapNumberArray.map((numberset) => numberset.split(" "))
		mapMap[mapKey] = mapNumberArray
		MapKeyIndex = i + 1
		mapKey++
	}

	return seeds
}


const generateConversion = (seedString, rangesArray) => {
	for (let setIndex = rangesArray.length - 1; setIndex >= 0; setIndex--) {
		let numberSet = rangesArray[setIndex]
		let sourceStart = parseInt(numberSet[1])
		let setRange = sourceStart + parseInt(numberSet[2])
		if (seedString >= sourceStart && seedString < setRange) {
			let difference = seedString - Math.abs(sourceStart)
			return parseInt(numberSet[0]) + difference
		}
	}

	return seedString

}


const binarySearch = (range, target) => {
	let left = range[0]
	let right = range[-1] - 1

	let middle = Math.floor((right - left) / 2)

	let locationNumber = 1
}
