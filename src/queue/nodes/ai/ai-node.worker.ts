// src/queue/nodes/ai/ai-node.worker.ts
import { Job } from 'bullmq';
import { BaseWorker } from '@/queue';
import { db } from '@/db';
import { nodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { AINodeData, AINodeOutput, NodeExecutionResult } from '../types';
import { generateAINodeData } from '@/lib/ai';

export class AINodeWorker extends BaseWorker<
	AINodeData,
	NodeExecutionResult<AINodeOutput>
> {
	constructor() {
		super(
			'ai-node',
			async (
				job: Job<AINodeData>
			): Promise<NodeExecutionResult<AINodeOutput>> => {
				const { nodeId, input } = job.data;

				const node = await db.query.nodes.findFirst({
					where: eq(nodes.id, nodeId),
				});

				if (!node) {
					throw new Error(`AI node - ${nodeId} not found`);
				}

				// Validate input
				if (!node.configuration) {
					throw new Error('Prompt is required for AI processing');
				}

				if (input) {
					node.configuration = input as unknown as Record<string, string>;
				}

				const output = await generateAINodeData(node.configuration);

				return {
					success: true,
					output,
				} as NodeExecutionResult<AINodeOutput>;
			}
		);
	}
}

export const aiNodeWorker = new AINodeWorker();
