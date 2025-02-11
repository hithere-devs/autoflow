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
				const { nodeId } = job.data;
				let input = job.data.input as Record<any, any>;
				console.log('Processing text node:', nodeId, 'with input:', input);

				const node = await db.query.nodes.findFirst({
					where: eq(nodes.id, nodeId),
				});

				if (!node) {
					throw new Error(`Text node ${nodeId} not found`);
				}

				if (!input) {
					input = JSON.parse(JSON.stringify(node.configuration)).variables;
				}

				console.log(input);

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

				const response = {
					success: true,
					output: { text },
				};

				// now that response is ready, we need to implement a fn which will fetch the next node and prepare the data according to that nodeType

				return response;
			}
		);
	}
}
export const textNodeWorker = new TextNodeWorker();
