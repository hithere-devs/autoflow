import { BaseQueue } from '@/queue';
import { AINodeData } from './types';

export class AINodeQueue extends BaseQueue {
	constructor() {
		super('ai-node');
	}

	async addProcessing(data: AINodeData) {
		return this.add('process', data);
	}
}

export const aiNodeQueue = new AINodeQueue();
