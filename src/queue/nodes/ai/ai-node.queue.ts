// src/queue/nodes/ai/ai-node.queue.ts

import { BaseQueue } from '@/queue/base/queue.base';
import { AINodeData } from '../types';
import { JobsOptions } from 'bullmq';

// Update AINodeQueue
export class AINodeQueue extends BaseQueue<AINodeData> {
	constructor() {
		super('ai-node');
	}

	async addProcessing(data: AINodeData, options?: JobsOptions) {
		return this.add(`process-${data.nodeId}`, data, options);
	}
}

export const aiNodeQueue = new AINodeQueue();
