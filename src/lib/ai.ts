import { AIInput } from '@/queue/nodes/types';

export const generateAINodeData = async ({
	model,
	prompt,
	system,
}: AIInput) => {
	return `this is your repsponse from AI model ${model} for system ${system} with prompt ${prompt}`;
};
