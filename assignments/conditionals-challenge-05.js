/*
A leap year is divisible by 4, but not by 100 unless also divisible by 400.
Problem Statement:
Write a function to check if a year is a leap year.
*/
// You just need to implement the isLeapYear function

function isLeapYear(year) {
	return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
		? 'Leap Year'
		: 'Not a Leap Year';
	// Return "Leap Year" if the year is a leap year, otherwise return "Not a Leap Year"
}
