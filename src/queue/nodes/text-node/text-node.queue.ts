import { BaseQueue } from '@/queue/base/queue.base';
import { TextNodeData } from '../types';

export class TextNodeQueue extends BaseQueue<TextNodeData> {
	constructor() {
		super('text-node');
	}

	async addProcessing(data: TextNodeData) {
		return this.add(`process-${data.nodeId}`, data);
	}
}

export const textNodeQueue = new TextNodeQueue();
