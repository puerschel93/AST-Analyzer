import gonzales from 'gonzales-pe';
import stylus from 'stylus';

class Parser {
	static async parseByType(type, file) {
		switch (type) {
			case 'scss':
				return await this.parseSCSS(file);
			case 'less':
				return await this.parseLESS(file);
			case 'styl':
				return await this.parseSTYL(file);
		}
	}

	static async parseSCSS(file) {
		try {
			return await gonzales.parse(file, { syntax: 'scss' });
		} catch (e) {
			return Parser.clearError(e, Parser.parseSCSS);
		}
	}

	static async parseLESS(file) {
		try {
			return await gonzales.parse(file, { syntax: 'less' });
		} catch (e) {
			return Parser.clearError(e, Parser.parseLESS);
		}
	}

	static async parseSTYL(file) {
		try {
			const Parser = stylus.Parser;
			const parser = new Parser(file);
			const ast = await parser.parse();
			return ast;
		} catch (e) {
			return e;
		}
	}

	static async clearError(file, handle) {
		const { line } = file;
		if (!file.css_) return '';
		const code = file.css_.split('\n');
		return await handle(code.splice(line + 1, 1).join('\n'));
	}
}

export default Parser;
