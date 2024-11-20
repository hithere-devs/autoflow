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
				console.log('Processing AI node:', nodeId, 'with input:', input);

				const node = await db.query.nodes.findFirst({
					where: eq(nodes.id, nodeId),
				});

				if (!node) {
					throw new Error(`AI node - ${nodeId} not found`);
				}

				// Validate input
				if (!input.prompt) {
					throw new Error('Prompt is required for AI processing');
				}

				// Implement AI node specific processing
				const data = await generateAINodeData(input);

				const result: NodeExecutionResult<AINodeOutput> = {
					success: true,
					output: {
						text: data,
						tokenCount: input.prompt.length,
					},
				};

				console.log('AI node result:', result);
				return result;
			}
		);
	}
}

export const aiNodeWorker = new AINodeWorker();
