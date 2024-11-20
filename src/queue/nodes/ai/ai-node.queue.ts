// src/queue/nodes/ai/ai-node.queue.ts
import { BaseQueue } from '@/queue';
import { AINodeData } from '../types';

export class AINodeQueue extends BaseQueue<AINodeData> {
	constructor() {
		super('ai-node');
	}

	async addProcessing(data: AINodeData) {
		return this.add(`process-${data.nodeId}`, data);
	}
}

export const aiNodeQueue = new AINodeQueue();
