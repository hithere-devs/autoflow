// src/queue/pipeline/pipeline.queue.ts
import { JobsOptions } from 'bullmq';
import { BaseQueue } from '../base/queue.base';
import { PipelineExecutionData } from './types';

// Update PipelineQueue
export class PipelineQueue extends BaseQueue<PipelineExecutionData> {
	constructor() {
		super('pipeline-execution');
	}

	async addProcessing(data: PipelineExecutionData, options?: JobsOptions) {
		return this.add('execute-pipeline', data, {
			attempts: 3,
			backoff: {
				type: 'exponential',
				delay: 1000,
			},
			...options,
		});
	}
}

export const pipelineQueue = new PipelineQueue();
