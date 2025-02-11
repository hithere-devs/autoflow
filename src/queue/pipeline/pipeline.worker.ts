import { Job } from 'bullmq';
import { BaseWorker } from '../base/worker.base';
import { PipelineExecutionData, QueueInputType } from './types';
import { db } from '@/db';
import { eq, and } from 'drizzle-orm';
import { executions, pipelines, Node, NodeEdge } from '@/db/schema';
import {
	nodeQueues,
	NodeType,
	NodeTypeToData,
} from '../nodes/queue.initializer';
import { AIInput, AINodeData, TextNodeInput } from '../nodes/types';

interface NodeWithEdges extends Node {
	inDegree: number;
	processed: boolean;
}

const isValidNodeType = (nodeTypeId: string) => {
	return true;
};

export class PipelineWorker extends BaseWorker<PipelineExecutionData> {
	constructor() {
		super('pipeline-execution', async (job: Job<PipelineExecutionData>) => {
			const { pipelineId, executionId } = job.data;

			try {
				// Fetch pipeline with nodes and edges
				const pipeline = await db.query.pipelines.findFirst({
					where: eq(pipelines.id, pipelineId),
					with: {
						nodes: true,
						nodeEdges: true,
					},
				});

				if (!pipeline || !pipeline.nodes) {
					throw new Error('Pipeline or nodes not found');
				}

				// Create adjacency list and calculate indegrees
				const graph = new Map<string, NodeWithEdges>();
				const edgeMap = new Map<string, NodeEdge[]>();
				const inDegrees = new Map<string, number>();

				// Initialize graphs
				pipeline.nodes.forEach((node) => {
					graph.set(node.id, { ...node, inDegree: 0, processed: false });
					edgeMap.set(node.id, []);
					inDegrees.set(node.id, 0);
				});

				// Build edge relationships and calculate indegrees
				pipeline.nodeEdges.forEach((edge) => {
					if (edge.sourceNodeId && edge.targetNodeId) {
						const sourceEdges = edgeMap.get(edge.sourceNodeId) || [];
						sourceEdges.push(edge);
						edgeMap.set(edge.sourceNodeId, sourceEdges);

						// Increment target node's indegree
						const targetNode = graph.get(edge.targetNodeId);
						if (targetNode) {
							targetNode.inDegree++;
							graph.set(edge.targetNodeId, targetNode);
						}
					}
				});

				// Initialize queue with nodes having 0 indegree
				const queue: NodeWithEdges[] = [];
				graph.forEach((node) => {
					if (node.inDegree === 0) {
						queue.push(node);
					}
				});

				// Process nodes in topological order
				while (queue.length > 0) {
					const currentNode = queue.shift()!;

					if (
						!currentNode.nodeTypeId ||
						!isValidNodeType(currentNode.nodeTypeId)
					) {
						throw new Error(`Invalid node type: ${currentNode.nodeTypeId}`);
					}

					try {
						// Execute node based on its type
						const nodeType = currentNode.nodeTypeId as NodeType;
						const nodeQueue = nodeQueues[nodeType];

						// Now TypeScript knows configuration matches the input type
						const job = await nodeQueue.addProcessing({
							nodeId: currentNode.id,
							input: currentNode.configuration as QueueInputType,
						});

						console.log(job);

						// Mark as processed and update execution status
						await db
							.update(executions)
							.set({ status: 'running' })
							.where(
								and(
									eq(executions.id, executionId),
									eq(executions.pipelineId, pipelineId)
								)
							);

						// Get outgoing edges and update next nodes
						const outgoingEdges = edgeMap.get(currentNode.id) || [];
						for (const edge of outgoingEdges) {
							if (edge.targetNodeId) {
								const targetNode = graph.get(edge.targetNodeId);
								if (targetNode) {
									targetNode.inDegree--;
									if (targetNode.inDegree === 0) {
										queue.push(targetNode);
									}
									graph.set(edge.targetNodeId, targetNode);
								}
							}
						}
					} catch (error: any) {
						console.error(`Failed to execute node ${currentNode.id}:`, error);
						await db
							.update(executions)
							.set({
								status: 'failed',
								log: `Failed at node: ${currentNode.id} - ${error.message}`,
							})
							.where(eq(executions.id, executionId));
						throw error;
					}
				}

				// Update execution status to completed
				await db
					.update(executions)
					.set({
						status: 'completed',
						completedAt: new Date(),
					})
					.where(eq(executions.id, executionId));
			} catch (error) {
				console.error(`Pipeline execution failed:`, error);
				throw error;
			}
		});
	}
}

export const pipelineWorker = new PipelineWorker();
