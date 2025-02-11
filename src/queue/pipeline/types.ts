import { AIInput, TextNodeInput } from '../nodes/types';

// src/queue/pipeline/types.ts
export interface PipelineExecutionData {
	pipelineId: string;
	executionId: string;
}

export type QueueInputType = AIInput & TextNodeInput;
