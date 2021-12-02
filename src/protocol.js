class Protocol {
	type;

	conditionalFile = 0;
	conditional = 0;

	loopFile = 0;
	loop = 0;

	variableFile = 0;
	variable = 0;

	functionFile = 0;
	function = 0;

	constructor(type) {
		this.type = type;
	}

	countConditionalFile = () => this.conditionalFile++;
	countConditional = (amount) => this.conditional + amount;

	countLoopFile = () => this.loopFile++;
	countLoop = (amount) => this.loop + amount;

	countVariableFile = () => this.variableFile++;
	countVariable = (amount) => this.variable + amount;

	countFunctionFile = () => this.functionFile++;
	countFunction = (amount) => this.function + amount;
}

export default Protocol;
