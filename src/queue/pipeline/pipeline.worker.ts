// src/queue/pipeline/pipeline.worker.ts
import { Job } from 'bullmq';
import { BaseWorker } from '../base/worker.base';
import { PipelineExecutionData } from './types';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { pipelines } from '@/db/schema';
import { BaseQueue } from '../base/queue.base';
import { textNodeQueue } from '../nodes/text-node/text-node.queue';
import { aiNodeQueue } from '../nodes/ai/ai-node.queue';

// Define supported node types
export type NodeTypeId = 'text-node-v1' | 'ai-node-v1';

// Type for the queue mapping
export type NodeQueueMapping = {
	[K in NodeTypeId]: BaseQueue;
};

// Create and export the queue mapping
export const nodeQueues: NodeQueueMapping = {
	'text-node-v1': textNodeQueue,
	'ai-node-v1': aiNodeQueue,
} as const;

// Type guard to check if a node type is supported
export const isValidNodeType = (type: string): type is NodeTypeId => {
	// based on the nodetype we can also check if out input data is matching the type of queue data or not
	// if not we can throw an error
	// if it is we can add the data to the queue

	return type in nodeQueues;
};

export class PipelineWorker extends BaseWorker<PipelineExecutionData> {
	constructor() {
		super('pipeline-execution', async (job: Job<PipelineExecutionData>) => {
			const { pipelineId, executionId } = job.data;

			try {
				// we have the pipeline, nodes, and node_types
				const pipeline = await db.query.pipelines.findFirst({
					where: eq(pipelines.id, pipelineId),
					with: {
						nodes: true,
						nodeEdges: true,
					},
				});

				// we have the pipeline, nodes and node_edges
				// based on the node and nodeEdges take out the first node and nextNode and then start a chain here where the firstNode is executed and then the exitQueue is the nextNode's Queue and so on based on the node_type_id which is mapped to the queue names of the respective nodes

				// find the position 0 node
				const firstNode = pipeline?.nodes.find((n) => n.position === 0);

				if (!firstNode || !firstNode.nodeTypeId) {
					throw new Error('Pipeline does not have a starting node');
				}

				console.log(firstNode.nodeTypeId);

				// Inside the worker constructor
				if (!isValidNodeType(firstNode.nodeTypeId)) {
					throw new Error(`Unsupported node type: ${firstNode.nodeTypeId}`);
				}

				const nodeQueue = nodeQueues[firstNode.nodeTypeId];
				await nodeQueue.addProcessing({
					nodeId: firstNode.id,
				});

				// map the queue to the node_type_id
			} catch (error) {
				console.error(`Pipeline execution failed:`, error);
				throw error;
			}
		});
	}
}

export const pipelineWorker = new PipelineWorker();
