import Reader from './reader.js';
import Parser from './parser.js';
import createQueryWrapper from 'query-ast';
import Protocol from './protocol.js';

class Analyzer {
	types = ['scss', 'less'];
	parser = new Parser();
	scssProtocol = new Protocol();
	numberOfFiles = 0;
	scssVariables = 0;

	async analyze() {
		for (const type of ['less']) {
			const reader = new Reader(type);
			const files = reader.readFilesFromDirectory();
			let count = 0;
			for (const file of files) {
				if (file === 'testfile.scss') continue;
				const content = reader.readFile(file);
				const ast = await this.parser.parseByType(type, content);
				if (ast) {
					const res = this.analyzeSyntaxTree(ast, type, file);
					count += res;
				}
			}
			console.log(count);
		}
	}

	analyzeSyntaxTree(ast, type, file) {
		switch (type) {
			case 'styl':
				this.analyzeStylus(ast);
				break;
			case 'less':
				return this.analyzeSCSS(ast, file);
				break;
			case 'scss':
				return this.analyzeSCSS(ast, file);
				break;
		}
	}

	analyzeStylus(ast) {
		//console.log(ast);
	}

	analyzeLess(ast) {
		const obj = Object.assign({}, ast);
		let $ = createQueryWrapper(obj, this.options);
		console.log($('variable').length());
	}

	options = {
		hasChildren: (node) => Array.isArray(node.content),
		getChildren: (node) => node.content,
		getType: (node) => node.type,
		toJSON: (node, children) => {
			return Object.assign({}, node, {
				value: children ? children : node.value,
			});
		},
		toString: (node) => {
			return typeof node.value === 'string' ? node.value : '';
		},
	};

	analyzeSCSS(ast, file) {
		const obj = Object.assign({}, ast);
		let $ = createQueryWrapper(obj, this.options);
		if ($('variable').nodes.map((node) => node.node.type).length > 0) {
			return $('variable').length();
		}
		return 0;
	}
	//console.log($('variable').children().length() === 0);
}

export default Analyzer;
