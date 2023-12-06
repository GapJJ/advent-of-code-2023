package main

import (
	"fmt"
)

func main() {
	fmt.Println("start")

	fmt.Println(parseInput())
}

type Window struct {
	left  int
	right int
}

func parseInput() int {
	var inputString = "scdz2twods"

	var sum int = 0
	sum += findNumbers(inputString)

	return sum
}
func findFirstOccurance(inputString string) int {
	var numberDict map[string]int = createNunberdict()

	fmt.Println(numberDict)

	var window = inputString[:3]
	var right int = 3
	for {
		value, ok := numberDict[window]
		if ok == true {
			return value * 10
		}
		if len(window) == 3 {
			window = window + string(inputString[right])
			right++
		} else {
			window = window[1:]
		}

		//close condition
		if right == len(inputString) && len(window) == 3 {
			break
		}
	}
	fmt.Println(window)
	return 0
}

func findNumbers(inputString string) int {

	leftHead := 0
	rightHead := len(inputString) - 1

	first := -1
	last := -1
	for leftHead <= rightHead {
		fmt.Println(int(inputString[leftHead]), leftHead, rightHead)
		if first == -1 {

			if isDigit(inputString[leftHead]) {
				first = int(inputString[leftHead])
			}
			leftHead++
		}
		if last == -1 {
			if isDigit(inputString[rightHead]) {
				last = int(inputString[rightHead])
			}
			rightHead--
		}
	}
	if first == -1 {
		first = last
	}
	if last == -1 {
		last = first
	}
	fmt.Println(first, last)
	return first*10 + last
}

func isDigit(char byte) bool {
	if char > 30 && char < 40 {
		return true
	} else {
		return false
	}
}
func findOccurance(inputString string) int {
	var numberDict map[string]int = createNunberdict()
	var firstWindow = inputString[:3]
	var lastWindow = inputString[len(inputString)-3:]
	var firstWindowHead int = 3
	var lastWindowHead int = len(inputString) - 3

	var firstInt int = 0
	var lastInt int = 0
	for {
		if firstInt == 0 {
			value, ok := numberDict[firstWindow]
			if ok == true {
				if firstInt == 0 {
					lastInt = value
				}
				firstInt = value * 10
			}
			if len(firstWindow) == 3 {
				if inputString[firstWindowHead] > 30 || inputString[firstWindowHead] < 40 {
					if firstInt == 0 {
						lastInt = int(inputString[firstWindowHead])
					}
					firstInt = int(inputString[lastWindowHead]) * 10
				}
				firstWindow = firstWindow + string(inputString[firstWindowHead])
				firstWindowHead++
			} else {
				firstWindow = firstWindow[1:]
			}

		}
		if lastInt == 0 {
			value, ok := numberDict[lastWindow]
			if ok == true {
				if firstInt == 0 {
					firstInt = value * 10
				}
				lastInt = value
			}
			if len(lastWindow) == 3 {
				lastWindow = string(inputString[lastWindowHead]) + lastWindow
				lastWindowHead--
			} else {
				lastWindow = lastWindow[:len(lastWindow)-1]
			}

		}
		if firstWindowHead > len(inputString) || lastWindowHead < 0 {
			break
		}
		//close condition
		fmt.Println(firstWindowHead, lastWindowHead)
		if firstWindowHead > lastWindowHead+4 {
			break
		}
	}
	return firstInt + lastInt
}

func createNunberdict() map[string]int {
	var numberdict = make(map[string]int)

	numberdict["one"] = 1
	numberdict["two"] = 2
	numberdict["three"] = 3
	numberdict["four"] = 4
	numberdict["five"] = 5
	numberdict["six"] = 6
	numberdict["seven"] = 7
	numberdict["eight"] = 8
	numberdict["nine"] = 9

	return numberdict
}
