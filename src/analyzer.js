/**
 * Created: 2021-11-21
 * Author: Florian Pürschel
 */
import createQueryWrapper from 'query-ast';
import { LESS_OPTIONS, SCSS_OPTIONS } from './ast-options.js';
import Parser from './parser.js';
import Reader from './reader.js';
import Logger from './utils/logger.js';

/**
 * This class is used to analyze the AST of a given file.
 * It is used by the analyzer-worker to analyze the AST of a given file.
 */
class Analyzer {
	//types = ['scss', 'less', 'styl'];
	types = ['styl'];
	numSCSS = 0;
	numLESS = 0;
	histogram = {};

	async analyze() {
		for (const type of this.types) {
			const reader = new Reader(type);
			const files = reader.readFilesFromDirectory();

			for (const file of files) {
				if (file.toLowerCase() === '.ds_store') continue;
				if (!file.includes('testfile')) continue;

				const content = reader.readFile(file);
				const ast = await Parser.parseByType(type, content);
				!Object.keys(ast).includes('css_')
					? this.analyzeSyntaxTree(ast, type, file, content)
					: Logger.error(`Could not parse ${file}`);
			}
		}
		console.log(this.histogram);
	}

	/**
	 * This function passes the AST and the filename to the analyzing function
	 * depending on the preprocessor.
	 * @param {*} ast - Abstract Syntax Tree
	 * @param {*} type - Type of file
	 * @param {*} file - Name of file
	 * @returns
	 */
	analyzeSyntaxTree(ast, type, file, code) {
		switch (type) {
			case 'styl':
				return this.analyzeStylus(ast, file, code);
			case 'less':
				return this.analyzeScss(ast, file, code);
			case 'scss':
				return this.analyzeScss(ast, file, code);
		}
	}

	/**
	 * Analyzes the AST of the Stylus Preprocessor
	 * @param {*} ast - Abstract Syntax Tree
	 * @param {*} file - Name of file
	 */
	analyzeStylus(ast, file) {
		Logger.info(`Analyzing ${file}`);

		if (!ast.nodes) return;
		for (const node of ast.nodes) {
			console.log(node);
		}
		/*for (const node of ast.nodes) {
			if (node.nodes) this.analyzeNodes(node.nodes);
		}*/
		//if (ast.nodes) this.analyzeNodes(ast.nodes);
	}

	analyzeNodes(nodes) {
		for (const node of nodes) {
			console.log(node.constructor.name);
			if (node.nodes) return this.analyzeNodes(node.nodes);
			else return console.log(node);
		}
	}

	/**
	 * Analyzes the AST of the LESS Preprocessor
	 * @param {*} ast - Abstract Syntax Tree
	 * @param {*} file - Name of file
	 */
	analyzeLess(ast, file) {
		this.numLESS++;
		Logger.info(`Analyzing ${file}`);

		const obj = Object.assign({}, ast);
		let $ = createQueryWrapper(obj, LESS_OPTIONS);

		this.numMixins += $('mixin').length();

		return;
	}

	/**
	 * Analyzes the AST of the SCSS Preprocessor
	 * @param {*} ast - Abstract Syntax Tree
	 * @param {*} file - Name of file
	 */
	analyzeScss(ast, file, code) {
		this.numSCSS++;
		Logger.info(`Analyzing ${file}`);
		const length = code.split('\n').length;
		let nestings = 0;
		const obj = Object.assign({}, ast);
		if (!obj.syntax) return;
		let $ = createQueryWrapper(obj, SCSS_OPTIONS);
		const rulesets = $('ruleset').length();
		for (const node of $('ruleset').nodes) {
			const json = JSON.parse(JSON.stringify(node));
			delete json.type;
			if (JSON.stringify(json).includes('ruleset')) nestings++;
		}

		const avgNestings = (nestings / length).toFixed(2);
		this.histogram[avgNestings] = (this.histogram[avgNestings] ?? 0) + 1;
	}
}

export default Analyzer;
