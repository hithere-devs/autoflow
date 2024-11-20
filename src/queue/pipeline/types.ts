// src/queue/pipeline/types.ts
export interface PipelineExecutionData {
	pipelineId: string;
	executionId: string;
	currentNodeId: string;
	input?: Record<string, any>;
}
