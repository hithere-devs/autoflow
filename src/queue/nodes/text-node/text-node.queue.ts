import { BaseQueue } from '@/queue/base/queue.base';
import { TextNodeData } from '../types';
import { JobsOptions } from 'bullmq';

// Update TextNodeQueue
export class TextNodeQueue extends BaseQueue<TextNodeData> {
	constructor() {
		super('text-node');
	}

	async addProcessing(data: TextNodeData, options?: JobsOptions) {
		return this.add(`process-${data.nodeId}`, data, options);
	}
}

export const textNodeQueue = new TextNodeQueue();
