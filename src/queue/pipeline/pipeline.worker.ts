// src/queue/pipeline/pipeline.worker.ts
import { Job } from 'bullmq';
import { BaseWorker } from '../base/worker.base';
import { PipelineExecutionData, NodeExecutionResult } from './types';
import { db } from '@/db';
import { ApiError } from '@/middlewares/error-handler';
import { tryWorker } from '@/utils/queue';

export class PipelineWorker extends BaseWorker<PipelineExecutionData> {
	constructor() {
		super('pipeline-execution', async (job: Job<PipelineExecutionData>) => {
			const { pipelineId, executionId, currentNodeId, input } = job.data;

			tryWorker(() => {
				// Get the edge details of the first node
				// Get first node details of the pipeline
				// Get node's queue name based on node type
				// Add job to node's queue with the exitqueue name
			}, 'pipeline-execution');

			try {
				// 	// Get current node details
				// 	const node = await db.query.nodes.findFirst({
				// 		where: (nodes, { eq }) => eq(nodes.id, currentNodeId),
				// 		with: {
				// 			nodeType: true,
				// 		},
				// 	});
				// 	if (!node) {
				// 		throw new ApiError(404, `Node ${currentNodeId} not found`);
				// 	}
				// 	// Get node's worker queue
				// 	const nodeQueue = this.getNodeQueue(node.nodeType.name);
				// 	// Add job to node queue
				// 	const nodeResult = await nodeQueue.add('process', {
				// 		nodeId: currentNodeId,
				// 		executionId,
				// 		input,
				// 	});
				// 	// Get next node from edges
				// 	const edge = await db.query.nodeEdges.findFirst({
				// 		where: (edges, { eq }) => eq(edges.sourceNodeId, currentNodeId),
				// 	});
				// 	if (!edge) {
				// 		// Pipeline complete
				// 		return nodeResult;
				// 	}
				// 	// Continue pipeline with next node
				// 	return await pipelineQueue.addPipelineExecution({
				// 		pipelineId,
				// 		executionId,
				// 		currentNodeId: edge.targetNodeId,
				// 		input: nodeResult.output,
				// 	});
			} catch (error) {
				console.error(`Pipeline execution failed:`, error);
				throw error;
			}
		});
	}

	// private getNodeQueue(nodeType: string) {
	// 	// Implement node queue factory based on type
	// 	switch (nodeType) {
	// 		case 'ai':
	// 			return aiNodeQueue;
	// 		case 'script':
	// 			return scriptNodeQueue;
	// 		default:
	// 			throw new Error(`Unknown node type: ${nodeType}`);
	// 	}
	// }
}

export const pipelineWorker = new PipelineWorker();
