// there will be varibales and text string, variables can come from the inputs of the node, it's connections from other nodes, if it's a DAG (the pipeline is a DAG), then the text node will compile the text string with the variables and return the result as the text string.
export const textNode = {
	// all the inputs are variables must be present in the text string in {{variable}} fromat.
	variables: {
		// every variable has to have a connected node, and that node will be returning the value of the variable which is a string,
		// if the variable is not connected to any node or text, then the text node will throw an error, this error must be displayed or thrown in the UI as well.
	},
	text: '{{v1}} {{v2}} {{v3}}, from a text node!',
};
