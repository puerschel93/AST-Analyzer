import gonzales from 'gonzales-pe';
import parser from 'scss-parser';
import stylus from 'stylus';

class Parser {
	async parseByType(type, file) {
		switch (type) {
			case 'scss':
				return await this.parseSCSS(file);
			case 'less':
				return await this.parseLESS(file);
			case 'styl':
				return await this.parseSTYL(file);
		}
	}

	async parseSCSS(file) {
		try {
			return await gonzales.parse(file, { syntax: 'scss' });
		} catch (e) {
			return null;
		}
	}

	async parseLESS(file) {
		try {
			return await gonzales.parse(file, { syntax: 'less' });
		} catch (e) {
			return null;
		}
	}

	async parseSTYL(file) {
		try {
			const Parser = stylus.Parser;
			const parser = new Parser(file);
			const ast = await parser.parse();
			return ast;
		} catch (e) {
			return null;
		}
	}
}

export default Parser;
