/*
You are given three numbers. Determine the largest among them.
Problem Statement:
Write a function that takes three numbers and returns the largest using if-else. */

// You just need to implement the findLargest function
function findLargest(a, b, c) {
	// Return the largest among a, b, and c
	let largest = a;
	[a, b, c].forEach((num) => {
		if (num > largest) largest = num;
	});
	return largest;
}
