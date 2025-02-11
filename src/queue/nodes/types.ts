// common types
export interface NodeExecutionResult<T = Record<string, any>> {
	success: boolean;
	output: T;
	error?: string;
}

export enum NodeType {
	AI_NODE = 'AI_NODE',
	TEXT_NODE = 'TEXT_NODE',
}

export type NodeConfiguration = {
	[NodeType.AI_NODE]: AIInput;
	[NodeType.TEXT_NODE]: TextNodeInput;
};

// inputs
export interface AIInput {
	prompt: string;
	system: string;
	model: 'gpt-3.5' | 'gpt-4o' | 'gpt-4-turbo';
}

export interface TextNodeInput {
	text: string;
}

// outputs
export interface AINodeOutput {
	text: string;
	tokenCount: number;
}

export interface TextNodeOutput {
	text: string;
}

// main data
export interface TextNodeData {
	nodeId: string;
	input?: TextNodeInput;
}

export interface AINodeData {
	nodeId: string;
	input?: AIInput;
}
