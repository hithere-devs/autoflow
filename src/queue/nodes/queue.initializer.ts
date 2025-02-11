import { BaseQueue } from '../base/queue.base';
import { pipelineQueue } from '../pipeline/pipeline.queue';
import { aiNodeQueue } from './ai/ai-node.queue';
import { textNodeQueue } from './text-node/text-node.queue';
import { AINodeData, TextNodeData } from './types';

// Base interface for all node data
interface BaseNodeData {
	nodeId: string;
	input?: Record<string, any>;
}

// Node type literals
export type NodeType = 'AI_NODE' | 'TEXT_NODE';

// Map node types to their data types
export type NodeTypeToData = {
	AI_NODE: AINodeData;
	TEXT_NODE: TextNodeData;
};

// Type for the queue mapping
type NodeQueueMap = {
	[K in NodeType]: BaseQueue<NodeTypeToData[K]>;
};

export type NodeInput<T extends NodeType> = NodeTypeToData[T]['input'];

// Export typed queue mapping
export const nodeQueues: NodeQueueMap = {
	AI_NODE: aiNodeQueue,
	TEXT_NODE: textNodeQueue,
} as const;

// Helper to validate node types
export const isValidNodeType = (type: string): type is NodeType => {
	return type in nodeQueues;
};

export const queueInitializer = () => {
	return [pipelineQueue, aiNodeQueue, textNodeQueue];
};
