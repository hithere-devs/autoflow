// src/queue/nodes/text/text-node.worker.ts
import { Job } from 'bullmq';
import { BaseWorker } from '@/queue';
import { db } from '@/db';
import { nodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NodeExecutionResult, TextNodeData, TextNodeOutput } from '../types';

export class TextNodeWorker extends BaseWorker<
	TextNodeData,
	NodeExecutionResult<TextNodeOutput>
> {
	constructor() {
		super(
			'text-node',
			async (
				job: Job<TextNodeData>
			): Promise<NodeExecutionResult<TextNodeOutput>> => {
				const { nodeId, input } = job.data;
				console.log('Processing text node:', nodeId, 'with input:', input);

				const node = await db.query.nodes.findFirst({
					where: eq(nodes.id, nodeId),
				});

				if (!node) {
					throw new Error(`Text node ${nodeId} not found`);
				}

				const template = node.configuration?.text as string;
				if (!template) {
					throw new Error(`Text template not found in node ${nodeId}`);
				}

				const variables =
					template.match(/\{\{(\w+)\}\}/g)?.map((v) => v.slice(2, -2)) || [];
				const missingVars = variables.filter((v) => !(v in input));

				if (missingVars.length > 0) {
					throw new Error(
						`Missing required variables: ${missingVars.join(', ')}`
					);
				}

				let text = template;
				for (const [key, value] of Object.entries(input)) {
					text = text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
				}

				return {
					success: true,
					output: { text },
				};
			}
		);
	}
}
export const textNodeWorker = new TextNodeWorker();
