import { AIInput } from '@/queue/nodes/types';
import OpenAI from 'openai';

export const generateAINodeData = async ({
	model,
	prompt,
	system,
}: Record<string, string>) => {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	const response = await openai.chat.completions.create({
		model: model,
		messages: [
			{ role: 'system', content: system as string },
			{ role: 'user', content: prompt as string },
		],
	});

	return {
		text: response.choices[0].message.content as string,
		tokenCount: response.usage?.total_tokens as number,
	};
};
