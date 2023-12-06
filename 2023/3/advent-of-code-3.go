package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("hello")

	getInput()
}

func getInput() []byte {
	input, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	start := 0
	for i := 0; i < len(input); i++ {
		if input[i] == 10 {
			var row []byte = input[start:i]
			fmt.Println(input[i])
			fmt.Printf("%T\n", row)
			fmt.Printf("%T\n", input)
			start = i + 1
		}
	}
	return input
}
