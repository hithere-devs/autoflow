// src/queue/pipeline/pipeline.queue.ts
import { BaseQueue } from '../base/queue.base';
import { PipelineExecutionData } from './types';

export class PipelineQueue extends BaseQueue {
	constructor() {
		super('pipeline-execution');
	}

	async addPipelineExecution(data: PipelineExecutionData) {
		return this.add('execute-pipeline', data, {
			attempts: 3,
			backoff: {
				type: 'exponential',
				delay: 1000,
			},
		});
	}
}

export const pipelineQueue = new PipelineQueue();
