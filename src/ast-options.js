/** SCSS AST OPTIONS */
export const SCSS_OPTIONS = {
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

/** LESS AST OPTIONS */
export const LESS_OPTIONS = {
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
