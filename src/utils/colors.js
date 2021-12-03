/**
 * This is a set of colors to print colorcoded messages on the console
 * according to its importance or meaning.
 * @author Florian Pürschel
 * @version 1.0.0
 * @url www.prshl.de
 */

const colors = {
	cyan: '\x1b[36m%s\x1b[0m',
	yellow: '\x1b[33m%s\x1b[0m',
	green: '\x1b[32m%s\x1b[0m',
	red: '\x1b[31m%s\x1b[0m',
	blue: '\x1b[34m%s\x1b[0m',
	magenta: '\x1b[35m%s\x1b[0m',
	white: '\x1b[37m\x1b[0m',
	gray: '\x1b[90m%s\x1b[0m',
	black: '\x1b[30m%s\x1b[0m',
	bgCyan: '\x1b[46m%s\x1b[0m',
	bgYellow: '\x1b[43m%s\x1b[0m',
	bgGreen: '\x1b[42m%s\x1b[0m',
};

export default colors;
