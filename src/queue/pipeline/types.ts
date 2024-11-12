// src/queue/pipeline/types.ts
export interface PipelineExecutionData {
	pipelineId: string;
	executionId: string;
	currentNodeId: string;
	input?: Record<string, any>;
}

export interface NodeExecutionResult {
	success: boolean;
	output: Record<string, any>;
	error?: string;
}
