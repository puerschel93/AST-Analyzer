import fs from 'fs';

class Reader {
	path;
	type;

	constructor(type) {
		this.type = type;
		this.path = `./src/input/${type}`;
	}

	readFilesFromDirectory() {
		return fs.readdirSync(this.path);
	}

	readFile(file) {
		return fs.readFileSync(`${this.path}/${file}`, 'utf8');
	}
}

export default Reader;
