import { TextNodeWorker } from './text-node/text-node.worker';
import { AINodeWorker } from './ai/ai-node.worker';

export const workerInitializer = () => {
	const textNodeWorker = new TextNodeWorker();
	const aiNodeWorker = new AINodeWorker();
	return {
		textNodeWorker,
		aiNodeWorker,
	};
};
