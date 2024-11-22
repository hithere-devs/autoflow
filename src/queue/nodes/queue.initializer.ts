import { pipelineQueue } from '../pipeline/pipeline.queue';
import { aiNodeQueue } from './ai/ai-node.queue';
import { textNodeQueue } from './text-node/text-node.queue';

export const queueInitializer = () => {
	return [pipelineQueue, aiNodeQueue, textNodeQueue];
};
