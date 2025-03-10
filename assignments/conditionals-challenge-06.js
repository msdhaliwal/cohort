/*
You need to determine what action to take based on traffic light colors:
• "Red" → Stop
• "Yellow" → Slow Down
• "Green" → Go
• "Blue" → Invalid Color
Problem Statement:
Write a function that uses switch-case to return the correct action.
*/

// You just need to implement the isLeapYear function
function trafficLightAction(color) {
	// Return "Stop", "Slow Down", or "Go" based on the traffic light color
	color = color.toLowerCase();
	let statement = '';
	switch (color) {
		case 'red': {
			statement = 'Stop';
			break;
		}
		case 'yellow': {
			statement = 'Slow Down';
			break;
		}
		case 'green': {
			statement = 'Go';
			break;
		}
		case 'blue':
		default: {
			statement = 'Invalid Color';
			break;
		}
	}
	return statement;
}
