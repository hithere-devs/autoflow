// Defining a text node here

export const textNode = {
	inputs: {
		v1: 'Hello',
		v2: 'World',
		v3: '!',
		// and many more variables
	},
	// all the inputs are variables must be present in the text string in {{variable}} fromat
	text: '{{v1}} {{v2}} {{v3}}, from a text node!',
};
