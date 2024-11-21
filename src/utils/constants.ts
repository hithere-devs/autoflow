import { aiNodeQueue } from '@/queue';
import { textNodeQueue } from '@/queue/nodes/text-node/text-node.queue';

export function getQueueForNodeType(nodeTypeId: string) {
	switch (nodeTypeId) {
		case 'ai-node-v1':
			return aiNodeQueue;

		case 'text-node-v1':
			return textNodeQueue;

		default:
			throw new Error(`Unsupported node type ID: ${nodeTypeId}`);
	}
}
