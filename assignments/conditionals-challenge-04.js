/*
• 90+ → A
• 80-89 → B
• 70-79 → C
• 60-69 → D
• Below 60 → F

Given a student's marks, determine their grade based on this scale:
Problem Statement:
Write a function that returns the corresponding grade using if-else.
*/

// You just need to implement the calculateGrade function
function calculateGrade(marks) {
	let result = 'F';
	if (marks >= 90) {
		result = 'A';
	} else if (marks >= 80) {
		result = 'B';
	} else if (marks >= 70) {
		result = 'C';
	} else if (marks >= 60) {
		result = 'D';
	}
	return result;
	// Return grade based on the marks
}
