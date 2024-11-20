export interface NodeExecutionResult<T = Record<string, any>> {
	success: boolean;
	output: T;
	error?: string;
}

export interface TextNodeData {
	nodeId: string;
	input: Record<any, any>;
}

export interface TextNodeOutput {
	text: string;
}

export interface AIInput {
	prompt: string;
	system: string;
	model: 'gpt-3.5' | 'gpt-4o' | 'gpt-4-turbo';
}

export interface AINodeData {
	nodeId: string;
	input: AIInput;
}

export interface AINodeOutput {
	text: string;
	tokenCount: number;
}
