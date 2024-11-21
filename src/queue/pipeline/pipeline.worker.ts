// src/queue/pipeline/pipeline.worker.ts
import { Job } from 'bullmq';
import { BaseWorker } from '../base/worker.base';
import { PipelineExecutionData } from './types';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { pipelines } from '@/db/schema';
import { getQueueForNodeType } from '@/utils/constants';

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
				console.log(pipeline);

				// we have the pipeline, nodes and node_edges
				// based on the node and nodeEdges take out the first node and nextNode and then start a chain here where the firstNode is executed and then the exitQueue is the nextNode's Queue and so on based on the node_type_id which is mapped to the queue names of the respective nodes

				// find the position 0 node
				const firstNode = pipeline?.nodes.find((n) => n.position === 0);

				if (!firstNode || !firstNode.nodeTypeId) {
					throw new Error('Pipeline does not have a starting node');
				}

				console.log(firstNode.nodeTypeId);

				// map the queue to the node_type_id
				const nodeQueue = getQueueForNodeType(firstNode.nodeTypeId);

				nodeQueue.addProcessing({
					nodeId: firstNode.id,
				});
			} catch (error) {
				console.error(`Pipeline execution failed:`, error);
				throw error;
			}
		});
	}
}

export const pipelineWorker = new PipelineWorker();
